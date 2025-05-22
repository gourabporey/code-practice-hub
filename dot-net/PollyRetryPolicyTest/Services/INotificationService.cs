using PollyRetryPolicyTest.Models;

namespace PollyRetryPolicyTest.Services;

public interface INotificationService
{
    Task<Dictionary<string, object>> SendNotificationAsync(NotificationPayload payload);
}