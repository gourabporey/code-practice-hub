using System.Text.Json;
using Azure.Messaging.ServiceBus;
using Bogus;
using Common;

namespace ServiceBusMessagePublisher;

public class Program
{
    private const string connectionString =
        "Endpoint=sb://localhost;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;";
    private const string topicName = "sbt-order-created-events";
    private const int noOfMessages = 1;

    public static async Task Main(string[] args)
    {
        ServiceBusClient serviceBusClient = new ServiceBusClient(connectionString);
        var topicClient = serviceBusClient.CreateSender(topicName);

        var orderCreatedEventFaker = new Faker<OrderCreatedEvent>()
            .RuleFor(o => o.OrderId, f => f.Random.Guid())
            .RuleFor(o => o.CustomerId, f => f.Random.Guid())
            .RuleFor(o => o.ProductId, f => f.Random.Guid())
            .RuleFor(o => o.Quantity, f => f.Random.Int(1, 100))
            .RuleFor(o => o.CreatedAt, f => f.Date.Past());

        for (int i = 0; i < noOfMessages; i++)
        {
            var orderCreatedEvent = orderCreatedEventFaker.Generate();
            var message = new ServiceBusMessage(JsonSerializer.Serialize(orderCreatedEvent));
            await topicClient.SendMessageAsync(message);
        }
    }
}
