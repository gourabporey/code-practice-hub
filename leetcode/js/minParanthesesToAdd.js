const assert = require("assert");
const { describe, it } = require("node:test");

var minAddToMakeValid = function (s) {
  const characters = s.split("");
  const OPENING_BRACE = "(";
  const CLOSING_BRACE = ")";

  const expected = { [OPENING_BRACE]: 0, [CLOSING_BRACE]: 0 };
  const pendingClosures = { [OPENING_BRACE]: 0, [CLOSING_BRACE]: 0 };

  for (const char of characters) {
    if (char === OPENING_BRACE) {
      expected[CLOSING_BRACE] += 1;
      pendingClosures[OPENING_BRACE] += 1;
    } else {
      const isPendingClosure = pendingClosures[OPENING_BRACE] > 0;

      if (isPendingClosure) {
        pendingClosures[OPENING_BRACE] -= 1;
        expected[CLOSING_BRACE] -= 1;
      } else {
        expected[OPENING_BRACE] += 1;
      }
    }
  }

  return expected[OPENING_BRACE] + expected[CLOSING_BRACE];
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
