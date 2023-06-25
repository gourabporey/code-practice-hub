const assert = require("assert");
const { describe, it } = require("node:test");
const { Calculator } = require("../src/calculator");

describe("calculator", () => {
  describe("validOperators", () => {
    it("are add and sub", () => {
      const calc = new Calculator();
      assert.deepStrictEqual(calc.validOperators, ['add', 'sub']);
    });
  });

  describe("renderBalance", () => {
    it("default balance is 0", (context) => {
      const fakeRender = context.mock.fn();
      const calc = new Calculator();

      calc.renderBalance(fakeRender);

      assert.strictEqual(fakeRender.mock.callCount(), 1);
      assert.deepStrictEqual(fakeRender.mock.calls[0].arguments, [0]);
    });

    it("balance is picked up from the constructor", (context) => {
      const fakeRender = context.mock.fn();
      const calc = new Calculator(1);

      calc.renderBalance(fakeRender);

      assert.strictEqual(fakeRender.mock.callCount(), 1);
      assert.deepStrictEqual(fakeRender.mock.calls[0].arguments, [1]);
    });
  });

  describe("operate", () => {
    it("add adds the given operand to the balance", (context) => {
      const fakeRender = context.mock.fn();
      const calc = new Calculator();

      calc.operate('add', 2);
      calc.renderBalance(fakeRender);

      assert.strictEqual(fakeRender.mock.callCount(), 1);
      assert.deepStrictEqual(fakeRender.mock.calls[0].arguments, [2]);
    });
  });
});
