import StackUsingQueue from "./src/StackUsingQ.js";

const main = () => {
  const stack = new StackUsingQueue();

  console.log(stack.push("first").push("second").push("third"));

  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
};

main();
