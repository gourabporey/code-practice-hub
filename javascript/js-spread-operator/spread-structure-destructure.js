const join = function(separator, ...elements) {
  return elements.reduce(function(concatenation, element) {
    return `${concatenation}${separator}${element}`;
  });
};

console.log(join(":", 1, 2, 4, 5));

const add = function(a, b) {
  return a + b;
};

const mul = function(a, b) {
  return a * b;
};

const calculator = function(operation, ...numbers) {
  return numbers.reduce(operation);
};

console.log(calculator(add, 1, 2, 3, 4, 5));
console.log(calculator(mul, 1, 2, 3, 4, 5));
