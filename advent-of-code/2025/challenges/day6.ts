import { last, zip } from "lodash";
import { multiply, sum } from "../utils/math";
import { skipLast } from "../utils/array";

type Sign = "+" | "*";

type MathProblem = {
  numbers: number[];
  sign: Sign;
};

const signOperationMap = {
  "+": sum,
  "*": multiply,
};

const toNumber = (value?: string) => (value ? Number.parseInt(value) : 0);

export const convertToMathProblems = (input: string): MathProblem[] => {
  return zip(...input.split("\n").map((line) => line.trim().split(/\s+/))).map(
    (line) => ({
      numbers: skipLast(line).map(toNumber),
      sign: last(line) as Sign,
    })
  );
};

export const convertToMathProblemsTopDown = (input: string): MathProblem[] => {
  const lines = input.split("\n");
  const signs = last(lines)!.trim().split(/\s+/);
  const numbersLines = skipLast(lines);
  const numbers: number[][] = [];

  if (numbersLines.length === 0) throw new Error("There are no lines");
  if (!numbersLines[0]) throw new Error("Line can't be undefined");

  for (let i = 0; i < numbersLines[0].length; i++) {
    const numString = numbersLines.map((line) => line[i]?.trim()).join("");

    if (numString === "") {
      numbers.push([]);
    } else {
      if (numbers.length === 0) numbers.push([]);
      last(numbers)!.push(toNumber(numString));
    }
  }

  return numbers.map((list, i) => ({ numbers: list, sign: signs[i] as Sign }));
};

const solveProblem = (problem: MathProblem): number => {
  return signOperationMap[problem.sign](...problem.numbers);
};

export const solveD6V1 = (input: string) => {
  const mathProblems = convertToMathProblems(input);
  return sum(...mathProblems.map(solveProblem));
};

export const solveD6V2 = (input: string) => {
  const mathProblems: MathProblem[] = convertToMathProblemsTopDown(input);
  return sum(...mathProblems.map(solveProblem));
};
