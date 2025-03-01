import assert from "node:assert";
import { describe, it } from "node:test";
import Stack from "../src/Stack.js";

describe("Stack", () => {
  describe("Push", () => {
    it("should push the item to the top of the stack and return total no of elements", () => {
      const stack = new Stack();
      assert.strictEqual(stack.push("first"), 1);
      assert.strictEqual(stack.top, "first");
    });
  });

  describe("Pop", () => {
    it("should pop the topmost item and return the item", () => {
      const stack = new Stack();
      assert.strictEqual(stack.push("first"), 1);
      assert.strictEqual(stack.push("second"), 2);
      assert.strictEqual(stack.pop(), "second");
    });

    it("should return null when there is no item in the stack", () => {
      const stack = new Stack();
      stack.push("first");
      stack.push("second");

      assert.strictEqual(stack.pop(), "second");
      assert.strictEqual(stack.pop(), "first");
      assert.strictEqual(stack.pop(), null);
    });
  });
});
