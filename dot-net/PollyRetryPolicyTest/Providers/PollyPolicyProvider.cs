using System.Net;
using Polly;
using Serilog;

namespace PollyRetryPolicyTest.Providers;

public static class PollyPolicyProvider
{
    public static IAsyncPolicy CreateKnockRetryPolicy()
    {
        return Policy
            .Handle<HttpRequestException>(r => r.StatusCode == HttpStatusCode.BadRequest)
            .WaitAndRetryAsync(
                retryCount: 3,
                sleepDurationProvider: retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                onRetry: (exception, timeSpan, retryCount, context) =>
                {
                    Log.Information(
                        $"retry {retryCount} after {timeSpan.TotalSeconds} seconds due to {exception.Message}");
                }
            );
    }
}