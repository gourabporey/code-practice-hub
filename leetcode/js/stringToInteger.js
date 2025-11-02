var myAtoi = function (s) {
  let traversed = 0;
  let isNegative = false;
  const INT_MAX = Math.pow(2, 31) - 1;
  const INT_MIN = -Math.pow(2, 31);
  const str = s.trimStart();
  const firstChar = str[0];
  let startIndex = 0;
  if (firstChar === "-") {
    isNegative = true;
    startIndex++;
  } else if (firstChar === "+") startIndex++;
  else if (!isNumberChar(firstChar)) return 0;

  for (let i = startIndex; i < str.length; i++) {
    const char = str[i];
    if (isNumberChar(char)) {
      if (traversed > (INT_MAX - +char) / 10) {
        return isNegative ? INT_MIN : INT_MAX;
      }
      traversed = traversed * 10 + +char;
    } else break;
  }

  return isNegative && traversed !== 0 ? -traversed : traversed;
};

const isNumberChar = (char) => {
  return char >= "0" && char <= "9";
};

const { describe, it } = require("node:test");
const assert = require("node:assert");

describe("myAtoi", () => {
  it("should output the whole number when the string is number", () => {
    assert.strictEqual(myAtoi("42"), 42);
  });
  it("should output the whole number when the string has leading whitespace", () => {
    assert.strictEqual(myAtoi("    42"), 42);
  });
  it("should stop scanning and give the whole number when the string has char", () => {
    assert.strictEqual(myAtoi("1337c0d3"), 1337);
  });
  it("should give the whole number when the string has sign", () => {
    assert.strictEqual(myAtoi("-1337"), -1337);
    assert.strictEqual(myAtoi("   -042"), -42);
  });
  it("should give zero when the string has non numeric char at start", () => {
    assert.strictEqual(myAtoi("gourab and 987"), 0);
  });
  it("should give preread number when the sign comes in between", () => {
    assert.strictEqual(myAtoi("1-2"), 1);
    assert.strictEqual(myAtoi("111+22"), 111);
    assert.strictEqual(myAtoi("+111"), 111);
  });
  it("should omit leading zeros", () => {
    assert.strictEqual(myAtoi("0001-2"), 1);
    assert.strictEqual(myAtoi("  00012"), 12);
    assert.strictEqual(myAtoi("  -042 5"), -42);
    assert.strictEqual(myAtoi("  -0 42 5"), 0);
  });
  it("should limit the out of range numbers", () => {
    assert.strictEqual(myAtoi("2147483648"), 2147483647);
    assert.strictEqual(myAtoi("-2147483648"), -2147483648);
  });
});
