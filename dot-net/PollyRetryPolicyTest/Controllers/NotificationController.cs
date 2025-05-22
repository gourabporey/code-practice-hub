using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using PollyRetryPolicyTest.Models;
using PollyRetryPolicyTest.Services;

namespace PollyRetryPolicyTest.Controllers;

[ApiController]
[Route("notifications")]
public class NotificationController(ILogger<NotificationController> logger, INotificationService notificationService)
{
    [HttpPost]
    [ProducesResponseType(typeof(Dictionary<string, object>), 200)]
    public async Task<Dictionary<string, object>> SendNotifications([FromBody] NotificationPayload payload)
    {
        logger.LogInformation("Processing notification payload");
        var result = await notificationService.SendNotificationAsync(payload);
        return result;
    }
}