const fs = require('fs');

const add = (a, b) => a + b;
const sum = (...numbers) => numbers.reduce(add, 0);
const sumOf = (numbers) => sum(...numbers);

const descending = (a, b) => b - a;
const ascending = (a, b) => a - b;
const sort = (numbers, order) => numbers.sort(order);

const toNumber = (numInTextFormat) => parseInt(numInTextFormat);
const readFileSync = (fileName) => fs.readFileSync(fileName, 'utf-8');

module.exports = {
  add,
  sum,
  sumOf,
  sort,
  descending,
  ascending,
  toNumber,
  readFileSync,
};
