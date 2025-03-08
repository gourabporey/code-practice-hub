/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var closestPrimes = function (left, right) {
  let primes = [];
  for (let number = left; number <= right; number++) {
    if (isPrime(number)) {
      primes.push(number);
    }
  }

  const length = primes.length;
  let currentLeastDifference = primes[length - 1] - primes[length - 2];
  let closestPrimePair = [-1, -1];

  for (let index = length - 1; index >= 1; index--) {
    const currentDifference = primes[index] - primes[index - 1];
    if (currentDifference <= currentLeastDifference) {
      currentLeastDifference = currentDifference;
      closestPrimePair = [primes[index - 1], primes[index]];
    }
  }

  return closestPrimePair;
};

var isPrime = (number) => {
  for (let n = 2; n <= Math.round(Math.sqrt(number)); n++) {
    if (number % n === 0) return false;
  }
  return true;
};

console.log(closestPrimes(10, 19));
console.log(closestPrimes(4, 6));
