import { solveD6V2 } from "./challenges/day6.ts";
import { readFile } from "./utils/readFile.ts";

const main = async () => {
  const input = await readFile("./data/day6/day6-large.txt");
  const result = solveD6V2(input);
  console.log(result);
};

main();
