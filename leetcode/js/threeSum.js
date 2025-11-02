/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// var threeSum = function (nums) {
//   // Declare an object to track the numbers
//   const result = [];
//   const traversed = {};

//   // for first set of iterations figure out the all combinations n2
//   const intermediateResult = {};
//   nums.forEach((num, i) => {
//     for (let j = i + 1; j < nums.length; j++) {
//       const jNum = nums[j];
//       const sum = num + jNum;
//       const rest = 0 - sum;
//       intermediateResult[rest] = intermediateResult[rest] || [];
//       intermediateResult[rest].push({ indexes: [i, j], values: [num, jNum] });
//     }
//   });

//   // for final iteration figure out the final one n
//   for (let k = 0; k < nums.length; k++) {
//     const num = nums[k];
//     if (num in intermediateResult) {
//       const triplets = intermediateResult[num]
//         .filter((list) => !list.indexes.includes(k))
//         .map((list) => list.values.concat(num));

//       // If it is not traversed before add it in the result
//       triplets.forEach((triplet) => {
//         triplet.sort();
//         const tripletKey = triplet.join(":");
//         if (!(tripletKey in traversed)) {
//           result.push(triplet);
//           traversed[tripletKey] = true;
//         }
//       });
//     }
//   }

//   // Return the values from the indexes
//   return result;
// };

var threeSum = function (nums) {
  // Declare a result to return
  const result = [];

  // Declare a map to track the existing valid triplets
  const existing = {};

  // Sort the input so that two pointer can be used efficiently
  const sorted = nums.sort((a, b) => a - b);

  // For each number, fix the number and find the other combo
  for (let i = 0; i < sorted.length - 2; i++) {
    let j = i + 1;
    let k = sorted.length - 1;

    while (j < k) {
      const sum = sorted[i] + sorted[j] + sorted[k];
      // If Combination matches the total to 0, validate and push it to the result
      if (sum === 0) {
        const triplet = [sorted[i], sorted[j], sorted[k]].sort();
        const tripletKey = triplet.join(":");
        if (!existing[tripletKey]) {
          result.push(triplet);
          existing[tripletKey] = true;
        }
        j++;
        k--;
      } else if (sum < 0) {
        j++;
      } else {
        k--;
      }
    }
  }

  // Return the result
  return result;
};

// {1: [{indexes: [0, 1], values: [-1, 0]}]}
/**
 * [-1,0,1,2,-1,-4] => [-4, -1, -1, 0, 1, 2]
 * [1, 0, -1, 2, 1, 4] * [0,1,2,-1,-4]
 */

const { describe, it } = require("node:test");
const assert = require("assert");

describe("threeSum", () => {
  it("Should give empty list when the only possible triplet does not sum up to 0", () => {
    assert.deepStrictEqual(threeSum([0, 1, 1]), []);
  });
  it("Should give the list when only possible triplet sum up to 0", () => {
    assert.deepStrictEqual(threeSum([0, 0, 0]), [[0, 0, 0]]);
  });
  it("Should give the list when multiple possible triplet sum up to 0", () => {
    assert.deepStrictEqual(threeSum([-1, 0, 1, 2, -1, -4]), [
      [-1, -1, 2],
      [-1, 0, 1],
    ]);
  });
});
