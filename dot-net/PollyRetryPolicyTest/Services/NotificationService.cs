using System.Net;
using Knock;
using PollyRetryPolicyTest.Models;

namespace PollyRetryPolicyTest.Services;

public class NotificationService(
    [FromKeyedServices("KnockTransientRetryPolicy")] IRetryPolicy retryPolicy,
    IRetryPolicyExecutor retryPolicyExecutor,
    ILogger<NotificationService> logger,
    KnockClient knockClient) : INotificationService
{
    public async Task<Dictionary<string, object>> SendNotificationAsync(NotificationPayload payload)
    {
        logger.LogInformation("Sending notification");
        return await retryPolicyExecutor.ExecuteAsync(async () => await SendNotification(payload), retryPolicy); 
    }
    
    private async Task<Dictionary<string, object>> SendNotification(NotificationPayload payload)
    {
        var workflowTriggerOpts = new TriggerWorkflow()
        {
            Data = new Dictionary<string, object>()
            {
                {"notification", new Dictionary<string, object>()
                {
                    {"Date", DateTime.Now},
                    {"SalesYear", DateTime.Now.Year}
                }}
            },
            Recipients = payload.Recipients.ToList<object>(),
        };

        try
        {
            // var result = await knockClient.Workflows.Trigger("local-weather-email-notification", workflowTriggerOpts);
            // return result;
            throw new HttpRequestException("Error sending notification", new Exception(), HttpStatusCode.ServiceUnavailable);
            // return new Dictionary<string, object>() {{"workflowTrigger", workflowTriggerOpts}};
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error sending notification");
            throw;
        }
    }
}