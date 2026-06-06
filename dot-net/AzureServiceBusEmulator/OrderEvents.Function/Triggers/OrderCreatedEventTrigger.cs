using System.Text.Json;
using Azure.Messaging.ServiceBus;
using Common;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace OrderEvents.Function.Triggers;

public class OrderCreatedEventTrigger(ILogger<OrderCreatedEventTrigger> logger)
{
    private const string topicName = "sbt-order-created-events";
    private const string subscriptionName = "sbts-order-created-events";
    private const string serviceBusConnectionKey = "ServiceBusConnection";

    [Function(nameof(OrderCreatedEventTrigger))]
    public void Run(
        [ServiceBusTrigger(
            topicName,
            subscriptionName,
            Connection = serviceBusConnectionKey,
            AutoCompleteMessages = true
        )]
            ServiceBusReceivedMessage message
    )
    {
        var orderCreatedEvent = JsonSerializer.Deserialize<OrderCreatedEvent>(message.Body);
        if (orderCreatedEvent is not null)
        {
            logger.LogInformation("OrderCreatedEvent: {OrderId}", orderCreatedEvent.OrderId);
        }
    }
}
