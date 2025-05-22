namespace PollyRetryPolicyTest.Models;

public enum RetryStrategy
{
    Fixed, 
    Exponential,
    Jitter,
}

public abstract class RetryPolicy
{
    public string PolicyName { get; set; } = "DefaultRetryPolicy";
    public int MaxRetries { get; set; } = 3;
    public List<Tuple<Type, Func<Exception, bool>>> ExceptionTypes { get; set; } = [new(typeof(Exception), (_) => true)] ;
    public RetryStrategy Strategy { get; set; } = RetryStrategy.Exponential; 
}