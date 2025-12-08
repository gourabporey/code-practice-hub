import { sum, uniq } from "lodash";

type Range = {
  upper: number;
  lower: number;
};

type ID = {
  value: number;
  freshIdRanges: Range[];
};

type CombinationResult = {
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

const combine = (r1: Range, r2: Range) => {
  if (r2.lower < r1.lower) [r1, r2] = [r2, r1];

  const [x1, y1] = [r1.lower, r1.upper];
  const [x2, y2] = [r2.lower, r2.upper];

  let low = undefined;
  let high = undefined;

  if (x2 >= x1 && x2 <= y1) {
    low = x1;
    if (y2 >= y1) high = y2;
    else high = y1;
  } else if (y2 >= x1 && y2 <= y1) {
    high = y1;
    if (x2 >= x1) low = x1;
    else low = x2;
  } else if (x1 === y2 + 1) {
    low = x2;
    high = y1;
  } else if (x2 === y1 + 1) {
    low = x1;
    high = y2;
  }

  if (low === undefined || high === undefined) return { success: false };
  return { success: true, range: { lower: low, upper: high } };
};

const combineRanges = (ranges: Range[]) => {
  let continuousRanges: Range[] = [];

  for (const range of ranges) {
    let combinationResult: CombinationResult = { success: false };

    for (let j = 0; j < continuousRanges.length; j++) {
      combinationResult = combine(range, continuousRanges[j] as Range);

      if (combinationResult.success) {
        continuousRanges.splice(j, 1, combinationResult.range!);
        continuousRanges = combineRanges(continuousRanges);
        break;
      }
    }

    if (!combinationResult.success) {
      continuousRanges.push(range);
    }
  }

  return continuousRanges;
};

const countIdsInRange = (range: Range) => range.upper - range.lower + 1;

const calculateFreshIdCountFromRanges = (ranges: Range[]): number => {
  return sum(combineRanges(ranges).map(countIdsInRange));
};

export const solveD5V1 = (input: string): number => {
  const ingredientData = parseIngredientData(input);
  return calculateFreshIdCount(ingredientData);
};

export const solveD5V2 = (input: string): number => {
  const ingredientData = parseIngredientData(input);
  return calculateFreshIdCountFromRanges(ingredientData.freshRanges);
};
