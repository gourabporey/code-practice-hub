import { calculateMaximumJoltage } from "./challenges/day3.ts";
import { solveD4V1, solveD4V2 } from "./challenges/day4.ts";
import { readFile } from "./utils/readFile.ts";

const main = async () => {
  const input = await readFile("./data/day4/day4-large.txt");
  const result = solveD4V2(input);
  console.log(result);
};

main();
