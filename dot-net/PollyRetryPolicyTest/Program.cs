using Knock;
using PollyRetryPolicyTest.Factories;
using PollyRetryPolicyTest.Models;
using PollyRetryPolicyTest.Services;
using Serilog;

namespace PollyRetryPolicyTest;

internal static class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var knockClient = new KnockClient(
            new KnockOptions()
            {
                ApiKey = Environment.GetEnvironmentVariable("KNOCK_API_KEY") ?? "KnockAPiKey",
            }
        );
        const string outputTemplate = "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}"; 

        var loggerConfiguration = new LoggerConfiguration().WriteTo.Console(outputTemplate: outputTemplate);
        Log.Logger = loggerConfiguration.CreateLogger();

        builder.Host.UseSerilog((_, configuration) =>
        {
            configuration.WriteTo.Console(outputTemplate: outputTemplate);
        });
        builder.Services.AddSingleton(knockClient);
        builder.Services.AddScoped<INotificationService, NotificationService>();
        builder.Services.AddKeyedScoped<IRetryPolicy, KnockTransientRetryPolicy>("KnockTransientRetryPolicy");
        builder.Services.AddSingleton<IRetryPolicyFactory, PollyRetryPolicyFactory>();
        builder.Services.AddScoped<IRetryPolicyExecutor, RetryPolicyExecutor>();

        builder.Services.AddSwaggerGen();
        builder.Services.AddControllers();
        builder.Services.AddOpenApi();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.UseSwaggerUI();
            app.UseSwagger();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}