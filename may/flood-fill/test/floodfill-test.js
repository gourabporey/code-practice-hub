const { describe, it } = require("node:test");
const { deepStrictEqual } = require("assert");

const { getBoundedPoints } = require("../src/floodfill-using-lookup.js");

describe("floodfillUsingObject", () => {
  it("Should not give anything for no point if there is no boundary.", () => {
    const actual = getBoundedPoints([[0, 0], [0, 0]]);
    const expected = [];

    deepStrictEqual(actual, expected);
  });

  it("Should not give boundary for less than 3 lines of input.", () => {
    const actual = getBoundedPoints([[0, 1], [0, 0], [0, 2]]);
    const expected = [];

    deepStrictEqual(actual, expected);
  });

  it("TEST_CASE1: Should give a points inside if multiple points resides between a boundary", () => {
    const points = [
      [1, 2], [0, 1], [0, 2], [1, 1], [1, 3], [2, 1], [2, 3], [3, 1],
      [3, 4], [4, 1], [4, 2], [4, 5], [5, 3], [5, 5], [6, 4]
    ];

    const actual = getBoundedPoints(points).sort((a, b) => a[0] - b[0]);
    const expected = [[1, 2], [2, 2], [3, 2], [3, 3], [4, 3], [4, 4], [5, 4]]

    deepStrictEqual(actual, expected);
  });

  it("TEST_CASE2: Should give a points inside if multiple points resides between a boundary", () => {
    let points = [
      [1, 2], [0, 2], [0, 3], [1, 1], [1, 4], [2, 1], [2, 3], [3, 1],
      [3, 4], [3, 5], [4, 2], [4, 6], [5, 3], [5, 4], [5, 5]
    ];

    const actual = getBoundedPoints(points).sort((a, b) => a[0] - b[0]);
    const expected = [[1, 2], [1, 3], [2, 2], [3, 2], [3, 3], [4, 3], [4, 4], [4, 5]];

    deepStrictEqual(actual, expected);
  });
});