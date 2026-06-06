using BenchmarkDotNet.Attributes;
using Newtonsoft.Json;
using System.Diagnostics;

namespace benchmarking.Benchmarks;

public class EventContext
{
  public required int TransferId { get; set; }
  public required int SalesYear { get; set; }
  public required string OriginSalesAgencyName { get; set; }
  public required int OriginSalesAgencyId { get; set; }
  public required string DesinationSalesAgencyName { get; set; }
  public required int DesinationSalesAgencyId { get; set; }
}

[MemoryDiagnoser]
[ThreadingDiagnoser]
public class ActivityBenchmark
{
  private static readonly ActivitySource ActivitySource = new("TransferService");
  private ActivityListener? _listener;
  private string _content = default!;

  [GlobalSetup]
  public void GlobalSetup()
  {
    _listener = new ActivityListener
    {
      ShouldListenTo = source => true,

      Sample = (ref ActivityCreationOptions<ActivityContext> _) =>
          ActivitySamplingResult.AllData
    };

    ActivitySource.AddActivityListener(_listener);

    var context = new EventContext()
    {
      SalesYear = 2025,
      TransferId = 12345567,
      OriginSalesAgencyId = 1220635,
      OriginSalesAgencyName = "Sloan Seed Agency",
      DesinationSalesAgencyId = 9999999,
      DesinationSalesAgencyName = "Some random Seed agency LLC"
    };

    _content = System.Text.Json.JsonSerializer.Serialize(context);
  }

  [GlobalCleanup]
  public void Cleanup()
  {
    _listener?.Dispose();
  }

  [Benchmark(Baseline = true)]
  public EventContext ProcessWithoutActivity()
  {
    return System.Text.Json.JsonSerializer.Deserialize<EventContext>(_content)!;
  }

  [Benchmark]
  public EventContext? ProcessWithoutActivityWithNewtonSoft()
  {
    return JsonConvert.DeserializeObject<EventContext>(_content);
  }

  [Benchmark]
  public EventContext ProcessWithActivity()
  {
    using var activity =
        ActivitySource.StartActivity("TransferProcessing");

    var context = System.Text.Json.JsonSerializer.Deserialize<EventContext>(_content)!;

    activity?.SetTag("TransferId", context.TransferId);
    activity?.SetTag("SalesYear", context.SalesYear);
    activity?.SetTag("OriginAgencyId", context.OriginSalesAgencyId);
    activity?.SetTag("DestinationAgencyId", context.DesinationSalesAgencyId);

    return context;
  }
}