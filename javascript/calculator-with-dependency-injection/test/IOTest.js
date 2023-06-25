const assert = require("assert");
const { describe, it } = require("node:test");
const { IO } = require("../src/io");

describe("IO", () => {
  describe.skip("writeLine", () => {
    it("writes to output stream with new line", (context) => {
      const outputStream = { write: context.mock.fn() };
      const io = new IO(null, outputStream);

      io.writeLine("something");

      assert.deepStrictEqual(outputStream.write.mock.calls[0].arguments, ['something\n']);
      assert.strictEqual(outputStream.write.mock.callCount(), 1);
    });
  });

  describe("watchInputLine", () => {
    it("watches inputstream at a frequency of 500ms and sends one line at a time", (context) => {
      const inputStream = {
        setEncoding: context.mock.fn(),
        on: context.mock.fn(),
        _readableState: { ended: true }
      };
      const io = new IO(inputStream, null);
      const onNewLine = context.mock.fn();

      io.watchInputLine(onNewLine);
      const [_, intervalCallback] = inputStream.on.mock.calls[0].arguments;
      intervalCallback('hello');
      intervalCallback('world');

      assert.deepStrictEqual(inputStream.setEncoding.mock.calls[0].arguments, ['utf8']);
      assert.strictEqual(inputStream.setEncoding.mock.callCount(), 1);
      assert.strictEqual(onNewLine.mock.callCount(), 2);
      assert.deepStrictEqual(onNewLine.mock.calls[0].arguments, ['hello']);
      assert.deepStrictEqual(onNewLine.mock.calls[1].arguments, ['world']);
    });
  });
});