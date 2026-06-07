using Grpc.Net.Client;
using GrpcClient;

var channel = GrpcChannel.ForAddress("http://localhost:5252");
var client = new Greeter.GreeterClient(channel);
var reply = await client.SayHelloAsync(new HelloRequest { Name = "World" });

Console.WriteLine("Greeting: " + reply.Message);
