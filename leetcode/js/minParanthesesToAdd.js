const assert = require("assert");
const { describe, it } = require("node:test");

var minAddToMakeValid = function (s) {
  let openingBraces = 0;
  let minAddsRequired = 0;

  for (const char of s) {
    if (char === "(") {
      openingBraces++;
    } else {
      if (openingBraces > 0) {
        openingBraces--;
      } else {
        minAddsRequired++;
      }
    }
  }

  return openingBraces + minAddsRequired;
};

describe("minAddtoMakeValid", () => {
  it("should return 0 for valid string", () => {
    assert.strictEqual(minAddToMakeValid(""), 0);
  });
  it("should return 1 for string of length 1", () => {
    assert.strictEqual(minAddToMakeValid("("), 1);
    assert.strictEqual(minAddToMakeValid(")"), 1);
  });
  it("should return correct number for any string", () => {
    assert.strictEqual(minAddToMakeValid("(("), 2);
    assert.strictEqual(minAddToMakeValid("()))(("), 4);
  });
});
