namespace Common;

public class OrderCreatedEvent
{
    public required Guid OrderId { get; set; }
    public required Guid CustomerId { get; set; }
    public required Guid ProductId { get; set; }
    public required int Quantity { get; set; }
    public required DateTime CreatedAt { get; set; }
}
