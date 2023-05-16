const fs = require("fs");
/*
function rl(numbers, sum) {
  const length = numbers.length;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      for (let k = j + 1; j < length; j++) {
        if (numbers[i] + numbers[j] + numbers[k] === sum)
          return [numbers[i], numbers[j], numbers[k]];
      }
    }
  }
}

function getRequiredSumTriplet(numbers, sum) {
  const sortedNumbers = numbers.sort((a, b) => a - b);
  const len = sortedNumbers.length;

  for (let i = 0; i < len; i++) {
    let left = i + 1;
    let right = len - 1;
    const remaining = sum - sortedNumbers[i];

    while (left < right) {
      const currentSum = sortedNumbers[left] + sortedNumbers[right];

      if (currentSum === remaining) {
        return [sortedNumbers[i], sortedNumbers[left], sortedNumbers[right]];
      }

      if (currentSum > remaining) {
        right--;
      } else {
        left++;
      }
    }
  }

  return [];
}
*/
function getRequiredSumTripletUsingLookup(numbers, sum) {
  const len = numbers.length;

  let i = 0;
  while (i < len) {
    const firstNum = numbers[i];
    const remaining = sum - firstNum;
    let j = i + 1;
    const remainingLookup = {};

    while (j < len) {
      const secondNum = numbers[j];
      const currentRemaining = remaining - secondNum;
      remainingLookup[secondNum] = currentRemaining;

      if (currentRemaining in remainingLookup) {
        return [firstNum, secondNum, currentRemaining];
      }

      j++;
    }

    i++;
  }

  return [];
}

function getRequiredSumTripletUsingIncludes(numbers, sum) {
  const len = numbers.length;

  let i = 0;
  while (i < len) {
    const remaining = sum - numbers[i];
    let j = i + 1;

    while (j < len) {
      const k = numbers.indexOf(remaining - numbers[j], j + 1);
      if (k !== -1) {
        return [numbers[i], numbers[j], numbers[k]];
      }

      j++;
    }

    i++;
  }

  return [];
}

const main = function () {
  const content = fs.readFileSync("./random-numbers.txt", "utf8");
  const numbers = content.split("\n").map((e) => +e);
  console.log(getRequiredSumTripletUsingIncludes(numbers, 119137415));
}

main();
