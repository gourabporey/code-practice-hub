using async_samples;
using BenchmarkDotNet.Running;

var summary = BenchmarkRunner.Run<CalAPIClient>();
