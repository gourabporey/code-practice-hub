import { solveD7V1, solveD7V2 } from "./challenges/day7.ts";
import { readFile } from "./utils/readFile.ts";

const main = async () => {
  const input = await readFile("./data/day7/day7-large.txt");
  const result = solveD7V2(input);
  console.log(result);
};

main();
