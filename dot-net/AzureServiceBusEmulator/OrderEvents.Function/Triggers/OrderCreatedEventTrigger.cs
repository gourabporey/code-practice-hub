using System.Diagnostics;
using System.Text.Json;
using Azure.Messaging.ServiceBus;
using Common;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using OrderEvents.Function.Constants;

namespace OrderEvents.Function.Triggers;

public class OrderCreatedEventTrigger(ILogger<OrderCreatedEventTrigger> logger)
{
    private static long _processed;
    private static readonly ActivitySource ActivitySource = new(ActivitySourceNames.OrderCreatedEvents);

    [Function(nameof(OrderCreatedEventTrigger))]
    public void Run(
        [ServiceBusTrigger(
            Topics.OrderCreatedEvents,
            Subscriptions.OrderCreatedEventsSubscription,
            Connection = ServiceBusConstants.serviceBusConnectionKey,
            AutoCompleteMessages = true
        )]
            ServiceBusReceivedMessage message
    )
    {
        var stopwatch = Stopwatch.StartNew();
        var allocatedBefore = GC.GetAllocatedBytesForCurrentThread();

        using var activity = ActivitySource.StartActivity("ProcessOrderEvent");

        logger.LogInformation("Activity Created = {Created}", activity is not null);

        try
        {
            var orderCreatedEvent = JsonSerializer.Deserialize<OrderCreatedEvent>(message.Body);

            if (orderCreatedEvent is null)
            {
                logger.LogWarning("Unable to deserialize message");
                return;
            }

            activity?.SetTag("message.id", message.MessageId);
            activity?.SetTag("order.id", orderCreatedEvent.OrderId);

            logger.LogInformation("Processing order {OrderId}", orderCreatedEvent.OrderId);

            Interlocked.Increment(ref _processed);
        }
        finally
        {
            stopwatch.Stop();
            var allocatedAfter = GC.GetAllocatedBytesForCurrentThread();

            logger.LogInformation("Elapsed = {ElapsedMs} ms", stopwatch.Elapsed.TotalMilliseconds);
            logger.LogInformation("Allocated = {Bytes} bytes", allocatedAfter - allocatedBefore);

            if (_processed % 100 == 0)
            {
                logger.LogInformation("Processed {Count} messages", _processed);
            }
        }
    }
}
