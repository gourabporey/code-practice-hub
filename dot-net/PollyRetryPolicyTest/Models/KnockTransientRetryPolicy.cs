using System.Net;

namespace PollyRetryPolicyTest.Models;

public class KnockTransientRetryPolicy : IRetryPolicy
{
    public KnockTransientRetryPolicy()
    {
        MaxRetries = 3;
        PolicyName = "DefaultRetryPolicy";
        ExceptionTypes =
        [
            new Tuple<Type, Func<Exception, bool>>(typeof(Exception), ex =>
                ex is HttpRequestException { StatusCode: HttpStatusCode.ServiceUnavailable })
        ];
        Strategy = RetryStrategy.Exponential;
    }

    public string PolicyName { get; }
    public int MaxRetries { get; }
    public List<Tuple<Type, Func<Exception, bool>>> ExceptionTypes { get; }
    public RetryStrategy Strategy { get; }
}