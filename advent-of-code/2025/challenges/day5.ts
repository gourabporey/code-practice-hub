import { sum, uniq } from "lodash";

type Range = {
  upper: number;
  lower: number;
};

type ID = {
  value: number;
  freshIdRanges: Range[];
};

type MergeResult = {
  success: boolean;
  range?: Range;
};

type IngredientData = { freshRanges: Range[]; ids: ID[] };

const isFresh = (id: ID) => id.freshIdRanges.length > 0;

const isInRange = (id: ID, range: Range): boolean =>
  id.value <= range.upper && id.value >= range.lower;

const toNumber = (s: string | undefined) => Number.parseInt(s || "0");

const parseIngredientData = (input: string): IngredientData => {
  const [freshRangesStr = "", idsStr = ""] = input.split("\n\n");
  const freshRanges: Range[] = freshRangesStr
    .split("\n")
    .map((rangeStr) => rangeStr.split("-").map(toNumber))
    .map((r) => ({ lower: r[0] as number, upper: r[1] as number }));
  const ids: ID[] = idsStr
    .split("\n")
    .map(toNumber)
    .map((n) => ({ value: n, freshIdRanges: [] }));
  return { ids, freshRanges };
};

const calculateFreshIdCount = (ingredientData: IngredientData): number => {
  ingredientData.ids.forEach((id) => {
    id.freshIdRanges.push(
      ...ingredientData.freshRanges.filter((range) => isInRange(id, range))
    );
  });
  return ingredientData.ids.reduce(
    (totalFresh, id) => (isFresh(id) ? totalFresh + 1 : totalFresh),
    0
  );
};

const merge = (first: Range, second: Range): MergeResult => {
  if (second.lower < first.lower) [first, second] = [second, first];

  if (second.lower <= first.upper + 1) {
    return {
      success: true,
      range: {
        lower: first.lower,
        upper: Math.max(first.upper, second.upper),
      },
    };
  }

  return { success: false };
};

const mergeRanges = (ranges: Range[]) => {
  let merged: Range[] = [];

  for (const range of ranges) {
    let mergeResult: MergeResult = { success: false };

    for (let j = 0; j < merged.length; j++) {
      mergeResult = merge(range, merged[j] as Range);

      if (mergeResult.success) {
        merged.splice(j, 1, mergeResult.range!);
        merged = mergeRanges(merged);
        break;
      }
    }

    if (!mergeResult.success) {
      merged.push(range);
    }
  }

  return merged;
};

const countIdsInRange = (range: Range) => range.upper - range.lower + 1;

const calculateFreshIdCountFromRanges = (ranges: Range[]): number => {
  return sum(mergeRanges(ranges).map(countIdsInRange));
};

export const solveD5V1 = (input: string): number => {
  const ingredientData = parseIngredientData(input);
  return calculateFreshIdCount(ingredientData);
};

export const solveD5V2 = (input: string): number => {
  const ingredientData = parseIngredientData(input);
  return calculateFreshIdCountFromRanges(ingredientData.freshRanges);
};
