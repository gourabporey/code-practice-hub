namespace PollyRetryPolicyTest.Models;

public enum RetryStrategy
{
    Fixed, 
    Exponential,
    Jitter,
}

public interface IRetryPolicy
{
    public string PolicyName { get; }
    public int MaxRetries { get; }
    public List<Tuple<Type, Func<Exception, bool>>> ExceptionTypes { get; }
    public RetryStrategy Strategy { get; }
}