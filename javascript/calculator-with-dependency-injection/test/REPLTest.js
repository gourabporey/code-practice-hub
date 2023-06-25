const assert = require("assert");
const { describe, it } = require("node:test");

const { REPL } = require("../src/repl");
const { Calculator } = require("../src/calculator");

describe('REPL', () => {
  describe('run', () => {
    it('starts watching the new lines on inputstream', (context) => {
      const io = { watchInputLine: context.mock.fn() };
      const repl = new REPL(io, null);
      repl.run();
      assert.strictEqual(io.watchInputLine.mock.callCount(), 1);
    });
  });

  describe('processLine', () => {
    it('writes available options when invalid operator is provided', (context) => {
      const io = {
        watchInputLine: context.mock.fn(),
        writeLine: context.mock.fn()
      };
      const calc = { validOperators: ['one', 'two'] };
      const repl = new REPL(io, calc);
      repl.processLine('bad 2');
      assert.deepStrictEqual(io.writeLine.mock.calls[0].arguments, ['one two']);
    });

    it('writes available options when invalid operand is provided', (context) => {
      const io = { writeLine: context.mock.fn() };
      const calc = new Calculator();
      const repl = new REPL(io, calc);
      repl.processLine('one abc');
      assert.deepStrictEqual(io.writeLine.mock.calls[0].arguments, ['add sub']);
    });

    it('writes balance after operating when valid operand and operators are provided', (context) => {
      const io = { writeLine: context.mock.fn() };
      const calc = new Calculator();
      const repl = new REPL(io, calc);
      repl.processLine('add 1');

      assert.deepStrictEqual(io.writeLine.mock.calls[0].arguments, [1]);
    });
  });
});