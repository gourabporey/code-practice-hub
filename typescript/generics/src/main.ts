import { concat, identity, reverse } from './array-strings';
import { ASTON_DB12, BMW_S_1000_RR } from './constants';
import Stack from './stack';
import { sortVehileBasedOnPrice } from './vehicle';

const main = (): void => {
  const numbers = [1, 2, 3, 4];
  console.log(reverse(numbers));
  console.log(identity(5));
  const strStack = new Stack<string>();
  strStack.push('gourab');
  strStack.push('sauma');
  console.log('Pop returns the top element', strStack.pop());
  console.log('Peek element of the stack is', strStack.peek());

  const vehicles = [ASTON_DB12, BMW_S_1000_RR];
  console.log(sortVehileBasedOnPrice(vehicles));

  const oneToFive = [1, 2, 3, 4, 5];
  const sixToTen = [6, 7, 8, 9, 10];
  console.log(concat(oneToFive, sixToTen));

  // NOTE: sometimes we need to specify the type as done below concat example when the compiler fails to understand the type
  console.log(concat<string>('gourab', ' porey'));
};

main();
