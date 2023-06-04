const { describe, it } = require("node:test");
const { IO } = require("../src/io");
const assert = require("assert");
const { createSpyFunction } = require("./spyLib");


describe("IO", () => {
  describe("writeLine", () => {
    it("writes to output stream with new line", () => {
      const outputStream = { write: createSpyFunction() };
      const io = new IO(null, outputStream, null);

      io.writeLine("something");

      assert.deepStrictEqual(outputStream.write.calls[0], { args: ['something\n'] });
      assert.ok(outputStream.write.wasCalledOnce());
    })
  });

  describe("watchInputLine", () => {
    it("watches inputstream at a frequency of 500ms and sends one line at a time", () => {
      const inputStream = {
        setEncoding: createSpyFunction(),
        read: createSpyFunction("hello\nWorld", null),
        _readableState: { ended: true }
      };
      const timer = { setInterval: createSpyFunction(), clearInterval: createSpyFunction() }
      const io = new IO(inputStream, null, timer);
      const onNewLine = createSpyFunction();

      io.watchInputLine(onNewLine);
      const [intervalCallback, ms] = timer.setInterval.calls[0].args;
      intervalCallback();
      intervalCallback();

      assert.strictEqual(ms, 500);
      assert.deepStrictEqual(inputStream.setEncoding.calls[0], { args: ['utf8'] });
      assert.ok(inputStream.setEncoding.wasCalledOnce());
      assert.ok(timer.setInterval.wasCalledOnce());
      assert.ok(onNewLine.wasCalledTwice());
      assert.deepStrictEqual(onNewLine.calls[0], { args: ['hello'] });
      assert.deepStrictEqual(onNewLine.calls[1], { args: ['World'] });
      assert.ok(timer.clearInterval.wasCalledOnce());

    })
  })
})