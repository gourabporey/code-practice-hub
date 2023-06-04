const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");
const { Calculator } = require("../src/calculator");
const { createSpyFunction } = require("./spyLib");

let fakeRender;

describe("calculator", () => {
  beforeEach(() => {
    fakeRender = createSpyFunction();
  })

  describe("validOperators", () => {
    it("are add and sub", () => {
      const calc = new Calculator();
      assert.deepStrictEqual(calc.validOperators, ['add', 'sub']);
    })
  })

  describe("renderBalance", () => {
    it("default balance is 0", () => {
      const calc = new Calculator();
      calc.renderBalance(fakeRender);
      assert.ok(fakeRender.wasCalledOnce(0));
    });

    it("balance is picked up from the constructor", () => {
      const calc = new Calculator(1);
      calc.renderBalance(fakeRender);
      assert.ok(fakeRender.wasCalledOnce(1));
    })
  })

  describe("operate", () => {
    it("add adds the given operand to the balance", () => {
      const calc = new Calculator();
      calc.operate('add', 2);
      calc.renderBalance(fakeRender);
      assert.ok(fakeRender.wasCalledOnce(2));
    })
  })
})
