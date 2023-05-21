const { describe, it } = require("node:test");
const { deepStrictEqual } = require("assert");

const { pointsInside, floodfill } = require("../src/floodfill.js");

describe("pointsInside", () => {
  it("Should not give anything if two points are same", () => {
    const actual = pointsInside([0, 0], [0, 0]);
    const expected = [];
    deepStrictEqual(actual, expected);
  });

  it('Should give nothing when row numbers are not same', () => {
    const actual = pointsInside([0, 0], [1, 0]);
    const expected = [];
    deepStrictEqual(actual, expected);
  });

  it("Should give the point when there is exactly one point inside the points", () => {
    const actual = pointsInside([0, 0], [0, 2]);
    const expected = [[0, 1]];
    deepStrictEqual(actual, expected);
  });

  it("Should give all the points when there are multiples points inside the points", () => {
    const actual = pointsInside([0, 0], [0, 3]);
    const expected = [[0, 1], [0, 2]];
    deepStrictEqual(actual, expected);
  });
});