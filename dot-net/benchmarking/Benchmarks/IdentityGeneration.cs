using BenchmarkDotNet.Attributes;
using NUlid;

namespace benchmarking.Benchmarks;

[MemoryDiagnoser]
[ThreadingDiagnoser]
#pragma warning disable CA1822 // Mark members as static
public class IdentityGeneration
{
  [Benchmark(Baseline = true)]
  public Guid GenerateGuid()
  {
    return Guid.NewGuid();
  }

  [Benchmark]
  public string GuidAsString()
  {
    return Guid.NewGuid().ToString();
  }

  [Benchmark]
  public Ulid NewUlid()
  {
    return Ulid.NewUlid();
  }
}
#pragma warning restore CA1822 // Mark members as static