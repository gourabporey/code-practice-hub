namespace PollyRetryPolicyTest.Models;

public class NotificationPayload
{
    public required string Message { get; set; }
    public required string[] Recipients { get; set; }
}