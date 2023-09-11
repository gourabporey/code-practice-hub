const memoization = (fn) => {
  const cache = {};

  return (...args) => {
    const result = cache[args] || fn.apply(this, args);
    cache[args] = result;

    return result;
  };
};

const isPrime = memoization((number) => {
  let denominator = 2;
  while (number % denominator !== 0) denominator++;
  return denominator === number;
});
