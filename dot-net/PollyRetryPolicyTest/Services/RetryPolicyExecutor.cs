using PollyRetryPolicyTest.Factories;
using PollyRetryPolicyTest.Models;

namespace PollyRetryPolicyTest.Services;

public class RetryPolicyExecutor(IRetryPolicyFactory retryPolicyFactory) : IRetryPolicyExecutor
{
    public async Task<TResult> ExecuteAsync<TResult>(Func<Task<TResult>> func, RetryPolicy retryPolicy)
    {
        var policy = retryPolicyFactory.CreateHttpRetryPolicy(retryPolicy);
        return await policy.ExecuteAsync(func);
    }
}