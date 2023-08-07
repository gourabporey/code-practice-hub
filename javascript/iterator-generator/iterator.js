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

const generateIterator = function* () {
  let number = 2;

  while (true) {
    if (isPrime(number)) yield number;
    number++;
  }
};
