import { OperationCanceledException } from "typescript";

interface Index {
  row: number;
  col: number;
}

enum Cell {
  ROLL = "@",
  REMOVED = "x",
  EMPTY = ".",
}

type GridLine = Cell[];

type Grid = GridLine[];

const toGridValue = (v: string): Cell => {
  switch (v) {
    case Cell.REMOVED:
      return Cell.REMOVED;
    case Cell.EMPTY:
      return Cell.EMPTY;
    case Cell.ROLL:
      return Cell.ROLL;
    default:
      throw new OperationCanceledException();
  }
};

const isRoll = (value: Cell) => value === Cell.REMOVED || value === Cell.ROLL;

const isSame = (row: number, col: number, index: Index) => {
  return row === index.row && col === index.col;
};

const calculateAdjacentRolls = (index: Index, grid: Grid): number => {
  let adjacentRollsCount = 0;

  for (let rollRow = index.row - 1; rollRow <= index.row + 1; rollRow++) {
    const currentRow = grid[rollRow] || [];
    for (let rollCol = index.col - 1; rollCol <= index.col + 1; rollCol++) {
      if (
        !isSame(rollRow, rollCol, index) &&
        isRoll(currentRow[rollCol] as Cell)
      ) {
        adjacentRollsCount++;
      }
    }
  }

  return adjacentRollsCount;
};

const parseGrid = (unparsedGrid: string): Grid => {
  return unparsedGrid
    .trim()
    .split("\n")
    .map((line) => line.split("").map(toGridValue));
};

const MAX_ADJACENT_ROLL_LIMIT = 4;

const calculateAccessibleRollsOfGrid = (grid: Grid): number => {
  let accessibleRollCount = 0;

  for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
    const currentRow = grid[rowIdx] || [];
    for (let colIdx = 0; colIdx < currentRow?.length; colIdx++) {
      if (currentRow[colIdx] === Cell.ROLL) {
        const index = { row: rowIdx, col: colIdx };
        const adjacentRollsCount = calculateAdjacentRolls(index, grid);
        if (adjacentRollsCount < MAX_ADJACENT_ROLL_LIMIT) {
          grid[rowIdx]![colIdx] = Cell.REMOVED;
          accessibleRollCount++;
        }
      }
    }
  }

  return accessibleRollCount;
};

const removeAccessibleRolls = (grid: Grid) => {
  for (let i = 0; i < grid.length; i++) {
    const currentGridLine = grid[0] || [];
    for (let j = 0; j < currentGridLine.length; j++) {
      if (grid[i]![j] && grid[i]![j] === Cell.REMOVED) {
        grid[i]![j] = Cell.EMPTY;
      }
    }
  }
};

export const solveD4V1 = (input: string): number => {
  const grid = parseGrid(input);
  return calculateAccessibleRollsOfGrid(grid);
};

export const solveD4V2 = (input: string): number => {
  let grid = parseGrid(input);
  let totalAccessibleRolls = 0;

  while (true) {
    const accessibleRolls = calculateAccessibleRollsOfGrid(grid);
    if (accessibleRolls === 0) break;
    totalAccessibleRolls += accessibleRolls;
    removeAccessibleRolls(grid);
  }

  return totalAccessibleRolls;
};
