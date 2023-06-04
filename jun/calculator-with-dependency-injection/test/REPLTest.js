const { describe, it } = require("node:test");
const { REPL } = require("../src/repl");
const { createSpyFunction } = require("./spyLib");
const assert = require("assert");
const { Calculator } = require("../src/calculator");

describe('REPL', () => {
  describe('run', () => {
    it('starts watching the new lines on inputstream', () => {
      const io = { watchInputLine: createSpyFunction() };
      const repl = new REPL(io, null);
      repl.run();
      assert.ok(io.watchInputLine.wasCalledOnce());
    })
  })
  
  describe('processLine', () => {
    it('writes available options when invalid operator is provided', () => {
      const io = { writeLine: createSpyFunction() };
      const calc = { validOperators: ['one', 'two'] };
      const repl = new REPL(io, calc);
      repl.processLine('bad 2');
      assert.ok(io.writeLine.wasCalledOnce('one two'))
    })

    it('writes available options when invalid operand is provided', () => {
      const io = { writeLine: createSpyFunction() };
      const calc = new Calculator();
      const repl = new REPL(io, calc);
      repl.processLine('one abc');
      assert.ok(io.writeLine.wasCalledOnce('add sub'))
    })

    it('writes balance after operating when valid operand and operators are provided', () => {
      const io = { writeLine: createSpyFunction() };
      const calc = new Calculator();
      const repl = new REPL(io, calc);
      repl.processLine('add 1');

      assert.ok(io.writeLine.wasCalledOnce(1));
    })
  })
});