/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findMissingAndRepeatedValues = function (grid) {
  const numberMap = {};
  const gridNumbers = grid.flat();

  const missingAndRepeatedValues = [];

  for (const number of gridNumbers) {
    numberMap[number] = (numberMap[number] || 0) + 1;
    if (numberMap[number] === 2) {
      missingAndRepeatedValues.push(number);
    }
  }

  for (const number in numberMap) {
    if (numberMap[number] === 0) {
      missingAndRepeatedValues.push(+number);
    }
  }

  return missingAndRepeatedValues;
};

console.log(
  findMissingAndRepeatedValues([
    [9, 1, 7],
    [8, 9, 2],
    [3, 4, 6],
  ])
);
