import { findPasswordV2, findPassword } from "./challenges/day1.ts";
import { solveD2V1, solveD2V2 } from "./challenges/day2.ts";
import { readFile } from "./utils/readFile.ts";

const main = async () => {
  const input = await readFile("./data/day2-large.txt");
  const result = solveD2V2(input);
  console.log(result);
};

main();
