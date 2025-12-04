import { findPassword } from "./challenges/day1.ts";
import { readFile } from "./utils/readFile.ts";

const main = async () => {
  const input = await readFile("./data/day1-large.txt");
  const result = findPassword(50, input);
  console.log(result);
};

main();
