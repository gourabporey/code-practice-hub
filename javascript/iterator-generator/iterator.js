const makeIterator = (start = 0, end = Infinity, step = 1) => {
  let value = start;

  return {
    next: () => {
      if (value >= end) return { value: undefined, done: true };

      const result = { value, done: false };
      value += step;

      return result;
    },
  };
};

const isPrime = (number) => {
  let factor = 2;
  while (number % factor !== 0) factor++;
  return factor === number;
};

const primeIterator = function* () {
  let number = 2;

  while (true) {
    if (isPrime(number)) yield number;
    number++;
  }
};

const juxt =
  (...functions) =>
  (...numbers) =>
    functions.map((func) => func(...numbers));

const fibonacci = function* () {
  let current = 0;
  let next = 1;

  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
};

const arrayIterator = function* (array) {
  let currentIndex = 0;

  while (true) {
    yield array[currentIndex % array.length];
    currentIndex++;
  }
};
