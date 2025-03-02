import assert from "node:assert";
import { describe, it } from "node:test";
import Queue from "../src/Queue.js";

describe("Queue", () => {
  describe("EnQueue", () => {
    it("should enqueue a item in the queue if its empty", () => {
      // Arrange
      const queue = new Queue();
      // Act
      queue.enQueue("First item");
      // Assert
      assert.strictEqual(queue.size, 1);
      assert.strictEqual(queue.peek(), "First item");
    });

    it("should enqueue any number of items in the queue", () => {
      // Arrange
      const queue = new Queue();
      // Act
      queue.enQueue("First item");
      queue.enQueue("Second item");
      queue.enQueue("Third item");
      // Assert
      assert.strictEqual(queue.size, 3);
      assert.strictEqual(queue.peek(), "First item");
    });
  });
  describe("DeQueue", () => {
    it("should return null when the queue is empty", () => {
      // Arrange
      const queue = new Queue();
      // Act
      const result = queue.deQueue();
      // Assert
      assert.strictEqual(result, null);
    });
    it("should return the dequeued item value when the queue is not empty", () => {
      // Arrange
      const queue = new Queue();
      queue.enQueue("First item");
      queue.enQueue("Second item");
      // Act
      const result = queue.deQueue();
      // Assert
      assert.strictEqual(result, "First item");
      assert.strictEqual(queue.size, 1);
    });
  });
});
