import { solveD5V2 } from "./challenges/day5.ts";
import { readFile } from "./utils/readFile.ts";

const main = async () => {
  const input = await readFile("./data/day5/day5-large.txt");
  const result = solveD5V2(input);
  console.log(result);
};

main();
