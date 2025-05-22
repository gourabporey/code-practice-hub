using PollyRetryPolicyTest.Models;

namespace PollyRetryPolicyTest.Services;

public interface IRetryPolicyExecutor
{
    public Task<TResult> ExecuteAsync<TResult>(Func<Task<TResult>> func, RetryPolicy retryPolicy);
}