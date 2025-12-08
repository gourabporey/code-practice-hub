export const multiply = (...numbers: number[]) =>
  numbers.reduce((acc, num) => num * acc, 1);

export const sum = (...numbers: number[]) =>
  numbers.reduce((acc, num) => num + acc, 0);
