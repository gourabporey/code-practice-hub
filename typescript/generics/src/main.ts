import Stack from './stack';
import { Bike, Car, sortVehileBasedOnPrice } from './vehicle';

const reverse = <T>(elements: Array<T>): Array<T> => {
  return [...elements].reverse();
};

const identity = <T>(element: T): T => element;

const main = (): void => {
  const numbers = [1, 2, 3, 4];
  console.log(reverse(numbers));

  console.log(identity(5));

  const strStack = new Stack<string>();
  strStack.push('gourab');
  console.log(strStack.pop());

  const ASTON_DB12: Car = {
    model: 'Aston Martin DB12',
    price: 4.59e7,
    color: 'Sea Green',
    doors: 2,
  };

  const BMW_S_1000_RR: Bike = {
    model: 'BMW S 1000 RR',
    price: 20.5e5,
    color: 'white',
    twoSeater: false,
  };

  const vehicles = [ASTON_DB12, BMW_S_1000_RR];
  console.log(sortVehileBasedOnPrice(vehicles));
};

main();
