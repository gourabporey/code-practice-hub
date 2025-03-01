import Stack from "./src/Stack";

const main = () => {
  const stack = new Stack();

  console.log(stack.push("first"));
  console.log(stack.push("second"));
  console.log(stack.push("third"));

  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
};

main();
