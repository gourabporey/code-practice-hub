using BenchmarkDotNet.Attributes;

namespace async_samples;

public class CalAPIClient
{
    private static async Task<String?> FetchCalendarDataAsync()
    {
        await Task.Delay(TimeSpan.FromSeconds(5));
        return DateTime.Now.ToString();
    }

    [Benchmark]
    public async Task<string?> GetTodayInformation()
    {
        return await FetchCalendarDataAsync().ConfigureAwait(false);
    }

    [Benchmark]
    public async Task<string?> GetTodayInformationAsync()
    {
        return await FetchCalendarDataAsync();
    }
}