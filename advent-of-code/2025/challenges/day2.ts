import { chunk } from "lodash";

interface IdRange {
  start: number;
  end: number;
}

const hasSameValues = (numbers: string[]) => {
  const first = numbers[0];
  return numbers.every((number) => number === first);
};

const getFactors = (num: number): number[] => {
  const factors = [];
  for (let n = 1; n <= num / 2; n++) {
    if (num % n === 0) factors.push(n);
  }
  return factors;
};

const isInvalid = (
  num: number,
  minRepeat: number = 1,
  maxRepeat?: number
): boolean => {
  const numStr = num.toString();
  const factors: number[] = getFactors(numStr.length);
  const repeats = factors.filter(
    (d) => d >= minRepeat && d <= (maxRepeat || Math.max(...factors))
  );
  const repeatsList = repeats.map((r) =>
    chunk(numStr, r).map((ch) => ch.join(""))
  );
  return repeatsList.some((repeats) => hasSameValues(repeats));
};

const getInvalidIds = (range: IdRange): number[] => {
  const invalidIds: number[] = [];
  for (let i = range.start; i <= range.end; i++) {
    const isInvalidId = isInvalid(i, 1, 1);
    if (isInvalidId) invalidIds.push(i);
  }
  return invalidIds;
};

const getInvalidIdsV2 = (range: IdRange): number[] => {
  const invalidIds: number[] = [];
  for (let i = range.start; i <= range.end; i++) {
    const isInvalidId = isInvalid(i, 1);
    if (isInvalidId) invalidIds.push(i);
  }
  return invalidIds;
};

const sum = (numbers: number[]): number =>
  numbers.reduce((sumTillNow, num) => num + sumTillNow, 0);

const parseInput = (commaSeparatedInput: string): IdRange[] => {
  return commaSeparatedInput
    .trim()
    .split(",")
    .map((pair) => pair.split("-").map((numStr) => Number.parseInt(numStr)))
    .map(([start, end]) => ({ start, end } as IdRange));
};

export const solveD2V1 = (input: string): number => {
  const ranges = parseInput(input);
  const invalidIds: number[] = [];

  for (const range of ranges) {
    const invalidIdsInRange = getInvalidIds(range);
    invalidIds.push(...invalidIdsInRange);
  }

  return sum(invalidIds);
};

export const solveD2V2 = (input: string): number => {
  const ranges = parseInput(input);
  const invalidIds: number[] = [];

  for (const range of ranges) {
    const invalidIdsInRange = getInvalidIdsV2(range);
    invalidIds.push(...invalidIdsInRange);
  }

  return sum(invalidIds);
};
