const { describe, it } = require("node:test");
const { deepStrictEqual } = require("assert");

const { pointsInside, floodfill } = require("../src/floodfill.js");

describe("pointsInside", () => {
  it("Should not give anything if two points are same", () => {
    const actual = pointsInside([[0, 0], [0, 0]]);
    const expected = [];
    deepStrictEqual(actual, expected);
  });

  it('Should give nothing when row numbers are not same', () => {
    const actual = pointsInside([[0, 0], [1, 0]]);
    const expected = [];
    deepStrictEqual(actual, expected);
  });

  it("Should give the point when there is exactly one point inside the points", () => {
    const actual = pointsInside([[0, 0], [0, 2]]);
    const expected = [[0, 1]];
    deepStrictEqual(actual, expected);
  });

  it("Should give all the points when there are multiples points inside the points", () => {
    const actual = pointsInside([[0, 0], [0, 3]]);
    const expected = [[0, 1], [0, 2]];
    deepStrictEqual(actual, expected);
  });
});

describe("floodfill", () => {
  it("Should give the points inside the boundary", () => {
    const actual = floodfill([[0, 0], [0, 0]]);
    const expected = [];
    deepStrictEqual(actual, expected);
  });

  it("Should give a points inside if point resides between a boundary", () => {
    const actual = floodfill([[0, 0], [0, 2]]);
    const expected = [[0, 1]];
    deepStrictEqual(actual, expected);
  });

  it("TEST_CASE1: Should give a points inside if multiple points resides between a boundary", () => {
    const points = [
      [1, 2], [0, 1], [0, 2], [1, 1], [1, 3], [2, 1], [2, 3], [3, 1],
      [3, 4], [4, 1], [4, 2], [4, 5], [5, 3], [5, 5], [6, 4]
    ];

    const actual = floodfill(points);
    const expected = [[1, 2], [2, 2], [3, 2], [3, 3], [4, 3], [4, 4], [5, 4]]
    deepStrictEqual(actual, expected);
  });

  it("TEST_CASE2: Should give a points inside if multiple points resides between a boundary", () => {
    let points = [
      [1, 2], [0, 2], [0, 3], [1, 1], [1, 4], [2, 1], [2, 3], [3, 1],
      [3, 4], [3, 5], [4, 2], [4, 6], [5, 3], [5, 4], [5, 5]
    ];

    const actual = floodfill(points);
    const expected = [[4, 3], [2, 2], [3, 3], [1, 3], [4, 5], [4, 4], [1, 2], [3, 2]];
    deepStrictEqual(actual.length, expected.length);
  });
});