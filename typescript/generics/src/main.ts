import Stack from './stack';

const reverse = <T>(elements: Array<T>): Array<T> => {
  return [...elements].reverse();
};

const main = (): void => {
  const numbers = [1, 2, 3, 4];
  console.log(reverse(numbers));

  const strStack = new Stack<string>();
  strStack.push('gourab');
  console.log(strStack.pop());
};

main();
