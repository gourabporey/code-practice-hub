# Benchmarking Results

### Get4FromMiddle

| Method         | n     |      Mean |     Error |    StdDev |
| -------------- | ----- | --------: | --------: | --------: |
| Get4FromMiddle | 10    |  29.96 ns |  0.095 ns |  0.080 ns |
| Get4FromMiddle | 100   |  45.61 ns |  0.495 ns |  0.439 ns |
| Get4FromMiddle | 10000 | 991.17 ns | 19.850 ns | 26.499 ns |

| Method         | n     |      Mean |     Error |    StdDev |   Gen0 |   Gen1 | Allocated |
| -------------- | ----- | --------: | --------: | --------: | -----: | -----: | --------: |
| Get4FromMiddle | 10    |  29.75 ns |  0.095 ns |  0.079 ns | 0.0411 |      - |     344 B |
| Get4FromMiddle | 100   |  45.93 ns |  0.259 ns |  0.216 ns | 0.0842 | 0.0001 |     704 B |
| Get4FromMiddle | 10000 | 974.20 ns | 18.779 ns | 20.093 ns | 4.8065 | 0.5989 |   40304 B |

## Activity

| Method                               |     Mean |   Error |  StdDev | Ratio | Completed Work Items | Lock Contentions |   Gen0 | Allocated | Alloc Ratio |
| ------------------------------------ | -------: | ------: | ------: | ----: | -------------------: | ---------------: | -----: | --------: | ----------: |
| ProcessWithoutActivity               | 276.3 ns | 1.24 ns | 1.04 ns |  1.00 |                    - |                - | 0.0296 |     248 B |        1.00 |
| ProcessWithoutActivityWithNewtonSoft | 704.6 ns | 3.30 ns | 2.92 ns |  2.55 |                    - |                - | 0.3414 |    2864 B |       11.55 |
| ProcessWithActivity                  | 421.5 ns | 1.76 ns | 1.56 ns |  1.53 |                    - |                - | 0.1144 |     960 B |        3.87 |

## Identity Generation

| Method       |     Mean |   Error |  StdDev |   Gen0 | Completed Work Items | Lock Contentions | Allocated |
| ------------ | -------: | ------: | ------: | -----: | -------------------: | ---------------: | --------: |
| GenerateGuid | 211.2 ns | 1.67 ns | 1.48 ns | 0.0114 |                    - |                - |      96 B |

| Method       |      Mean |    Error |   StdDev | Ratio | RatioSD | Completed Work Items | Lock Contentions |   Gen0 | Allocated | Alloc Ratio |
| ------------ | --------: | -------: | -------: | ----: | ------: | -------------------: | ---------------: | -----: | --------: | ----------: |
| GenerateGuid | 206.56 ns | 3.619 ns | 3.717 ns |  1.00 |    0.02 |                    - |                - |      - |         - |          NA |
| GuidAsString | 214.43 ns | 2.723 ns | 2.547 ns |  1.04 |    0.02 |                    - |                - | 0.0114 |      96 B |          NA |
| NewUlid      |  83.51 ns | 1.545 ns | 1.653 ns |  0.40 |    0.01 |                    - |                - |      - |         - |          NA |
