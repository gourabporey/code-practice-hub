import { calculateMaximumJoltage } from "./challenges/day3.ts";
import { readFile } from "./utils/readFile.ts";

const main = async () => {
  const input = await readFile("./data/day3/day3-large.txt");
  const result = calculateMaximumJoltage(input, 12);
  console.log(result);
};

main();
