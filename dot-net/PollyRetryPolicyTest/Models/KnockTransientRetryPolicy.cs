using System.Net;

namespace PollyRetryPolicyTest.Models;

public class KnockTransientRetryPolicy : RetryPolicy
{
    public KnockTransientRetryPolicy()
    {
        MaxRetries = 3;
        PolicyName= "DefaultRetryPolicy";
        ExceptionTypes = [new Tuple<Type, Func<Exception, bool>>(typeof(Exception), ex => 
                                                                   ex is HttpRequestException { StatusCode: HttpStatusCode.ServiceUnavailable })] ;
        Strategy = RetryStrategy.Exponential; 
    }
}