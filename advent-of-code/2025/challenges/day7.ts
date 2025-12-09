import { last } from "lodash";
import { sum } from "../utils/math";

export const parseManifold = (input: string): string[][] => {
  return input.split("\n").map((line) => line.split(""));
};

type Index = { r: number; c: number };

export const shoot = (starting: Index, grid: string[][]): string[][] => {
  const next = { r: starting.r + 1, c: starting.c };
  if (!grid[next.r]) {
    return grid;
  }

  const nextValue = grid[next.r]![next.c]!;

  if (nextValue === "^") {
    if (grid[next.r]![next.c - 1]) {
      grid[next.r]![next.c - 1] = "|";
      shoot({ r: next.r, c: next.c - 1 }, grid);
    }
    if (grid[next.r]![next.c + 1]) {
      grid[next.r]![next.c + 1] = "|";
      shoot({ r: next.r, c: next.c + 1 }, grid);
    }
  } else if (nextValue === ".") {
    grid[next.r]![next.c] = "|";
    shoot({ r: next.r, c: next.c }, grid);
  }

  return grid;
};

export const solveD7V1 = (input: string) => {
  const manifold = parseManifold(input);
  const startingIndex = {
    r: 0,
    c: manifold[0]!.findIndex((el) => el.toLowerCase() === "s"),
  };
  const result = findSplitsCount(shoot(startingIndex, manifold));
  return result;
};

const findSplitsCount = (grid: string[][]): number => {
  let count = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0]!.length; c++) {
      if (grid[r]![c] === "^" && grid[r - 1]![c] === "|") {
        count++;
      }
    }
  }

  return count;
};

export const solveD7V2 = (input: string) => {
  const manifold = parseManifold(input);
  return findAlltimelines(manifold);
};

const create2dArrayOf = (
  rows: number,
  cols: number,
  defaultValue: number = 0
): number[][] => {
  return new Array(rows).fill(0).map((_) => new Array(cols).fill(defaultValue));
};

const findAlltimelines = (manifold: string[][]): number => {
  const traversed: number[][] = create2dArrayOf(
    manifold.length,
    manifold[0]!.length
  );

  for (let r = 0; r < manifold.length; r++) {
    const currentRow: string[] = manifold[r]!;

    for (let c = 0; c < manifold[0]!.length; c++) {
      if (currentRow[c] === "S") {
        traversed[r]![c] = 1;
        continue;
      }

      if (currentRow[c] === ".") {
        traversed[r]![c] = Math.max(
          traversed[r]![c]!,
          traversed[r - 1] ? traversed[r - 1]![c]! + traversed[r]![c]! : 0
        );
        continue;
      }

      if (currentRow[c] === "^") {
        const cellTopOfSplitter = traversed[r - 1]![c] || 0;

        if (traversed[r]![c - 1] !== undefined) {
          const leftCellOfSplitter = traversed[r]![c - 1]!;
          traversed[r]![c - 1] = Math.max(
            leftCellOfSplitter + cellTopOfSplitter,
            leftCellOfSplitter
          );
        }

        if (traversed[r]![c + 1] !== undefined) {
          const rightCellOfSplitter = traversed[r]![c + 1]!;
          traversed[r]![c + 1] = Math.max(
            rightCellOfSplitter + cellTopOfSplitter,
            rightCellOfSplitter
          );
          continue;
        }
      }
    }
  }

  return sum(...(last(traversed) || []));
};
