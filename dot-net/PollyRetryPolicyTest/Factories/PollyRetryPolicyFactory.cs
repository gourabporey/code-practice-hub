using Polly;
using PollyRetryPolicyTest.Models;
using Serilog;

namespace PollyRetryPolicyTest.Factories;

public interface IRetryPolicyFactory
{
    IAsyncPolicy CreateHttpRetryPolicy(IRetryPolicy retryPolicy);
}

public class PollyRetryPolicyFactory : IRetryPolicyFactory
{
    public IAsyncPolicy CreateHttpRetryPolicy(IRetryPolicy retryPolicy)
    {
        var policyBuilder = Policy.Handle<HttpRequestException>(ex =>
            retryPolicy.ExceptionTypes.Any(exceptionPredicateTuple => exceptionPredicateTuple.Item2(ex)));

        Action<Exception, TimeSpan, int, Context> onRetry = (exception, timeSpan, retryCount, _) =>
        {
            Log.Information(
                $"retry {retryCount} after {timeSpan.TotalMilliseconds} ms due to {exception.Message}");
        };

        switch (retryPolicy.Strategy)
        {
            case RetryStrategy.Fixed:
                return policyBuilder
                    .WaitAndRetryAsync(
                        retryPolicy.MaxRetries,
                        _ => TimeSpan.FromSeconds(2),
                        onRetry);
            case RetryStrategy.Exponential:
                return policyBuilder
                    .WaitAndRetryAsync(
                        retryPolicy.MaxRetries,
                        i => TimeSpan.FromSeconds(Math.Pow(2, i)),
                        onRetry);
            case RetryStrategy.Jitter:
                var randomJitter = new Random();
                return policyBuilder
                    .WaitAndRetryAsync(
                        retryPolicy.MaxRetries,
                        i => TimeSpan.FromSeconds(Math.Pow(2, i)) +
                             TimeSpan.FromMilliseconds(randomJitter.Next(0, 1000)),
                        onRetry);
            default:
                throw new NotSupportedException($"Retry strategy {retryPolicy.Strategy} is not supported.");
        }
    }
}