using BenchmarkDotNet.Attributes;

namespace benchmarking.Benchmarks;

[MemoryDiagnoser]
[ThreadingDiagnoser]
public class ListBenchmarks
{
  [Params(10, 100, 10000)]
  public int n;

  private int[] elements = [];

  [GlobalSetup]
  public void GlobalSetup()
  {
    elements = new int[n];
  }

  [Benchmark]
  public int[] Get4FromMiddle()
  {
    int length = elements.ToList().Count;
    int middle = length % 2 == 0 ? (length / 2) : (length - 1) / 2;
    int[] fourElements = new int[4];
    for (int i = 0; i < 4; i++)
    {
      fourElements = [.. fourElements, elements[middle + i]];
    }
    return fourElements;
  }
}