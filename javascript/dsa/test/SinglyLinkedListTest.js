import assert from "node:assert";
import { describe, it } from "node:test";
import SinglyLinkedList from "../src/SinglyLinkedList.js";

describe("SinglyLinkedList", () => {
  describe("get", () => {
    it("should return undefined for index less than zero", () => {
      const sl = new SinglyLinkedList();
      sl.push(5);
      assert.strictEqual(sl.get(-1), undefined);
    });

    it("should return undefined for index greater than or equal list length", () => {
      const sl = new SinglyLinkedList();
      sl.push(5);
      sl.push(6);
      assert.strictEqual(sl.get(2), undefined);
      assert.strictEqual(sl.get(3), undefined);
    });

    it("should return the value at valid index specified", () => {
      const sl = new SinglyLinkedList();
      sl.push(5);
      sl.push(6);
      assert.strictEqual(sl.get(0), 5);
    });
  });
  describe("set", () => {
    it("should throw error if trying to set at index less than zero", () => {
      const sl = new SinglyLinkedList();
      assert.throws(() => sl.set(-1, 5), {
        message: /Index cannot be less than 0/,
      });
    });

    it("should throw error if trying to set at index greater than or equal to the length of the list", () => {
      const sl = new SinglyLinkedList();

      sl.push(4);
      sl.push(5);

      assert.strictEqual(sl.length, 2);
      assert.throws(() => sl.set(2, 5), {
        message: /Greater than 2/,
      });
    });

    it("should set the value at the specified index of the list", () => {
      const sl = new SinglyLinkedList();

      sl.push(4);
      sl.push(5);

      assert.strictEqual(sl.length, 2);
      assert.strictEqual(sl.set(0, 1), true);
      assert.strictEqual(sl.get(0), 1);
    });
  });
  describe("insert", () => {
    it("should not insert at any negative index", () => {
      const sl = new SinglyLinkedList();

      sl.push(4);
      sl.push(5);

      assert.strictEqual(sl.insert(-1, 5), false);
      assert.strictEqual(sl.length, 2);
    });
    it("should not insert at any index greater than the list length", () => {
      const sl = new SinglyLinkedList();

      sl.push(4);
      sl.push(5);

      assert.strictEqual(sl.insert(3, 5), false);
      assert.strictEqual(sl.length, 2);
    });
    it("should unshift if the index is zero", () => {
      const sl = new SinglyLinkedList();

      sl.push(4);
      sl.push(5);

      assert.strictEqual(sl.length, 2);
      assert.strictEqual(sl.insert(0, 1), true);
      assert.strictEqual(sl.get(0), 1);
      assert.strictEqual(sl.length, 3);
    });
    it("should push if the index is equal to the list length", () => {
      const sl = new SinglyLinkedList();

      sl.push(4);
      sl.push(5);

      assert.strictEqual(sl.length, 2);
      assert.strictEqual(sl.insert(2, 6), true);
      assert.strictEqual(sl.get(2), 6);
      assert.strictEqual(sl.length, 3);
    });
    it("should push at any valid index between 0 to list length", () => {
      const sl = new SinglyLinkedList();

      sl.push(4);
      sl.push(5);
      sl.push(6);
      sl.push(8);

      assert.strictEqual(sl.length, 4);
      assert.strictEqual(sl.insert(3, 7), true);
      assert.strictEqual(sl.get(3), 7);
      assert.strictEqual(sl.length, 5);
    });
  });
  describe("remove", () => {
    it("should return false while removing from index less than zero or greater than or equal to list length", () => {
      const sl = new SinglyLinkedList();

      sl.push(1);
      sl.push(2);
      sl.push(3);

      assert.strictEqual(sl.length, 3);
      assert.strictEqual(sl.remove(-1), false);
      assert.strictEqual(sl.remove(3), false);
      assert.strictEqual(sl.remove(4), false);
    });
    it("should shift the head to remove index 0", () => {
      const sl = new SinglyLinkedList();

      sl.push(1);
      sl.push(2);
      sl.push(3);

      assert.strictEqual(sl.length, 3);
      assert.strictEqual(sl.remove(0), 1);
      assert.strictEqual(sl.length, 2);
    });
    it("should pop from the list to remove index equal to index of last element", () => {
      const sl = new SinglyLinkedList();

      sl.push(1);
      sl.push(2);
      sl.push(3);

      assert.strictEqual(sl.length, 3);
      assert.strictEqual(sl.remove(2), 3);
      assert.strictEqual(sl.length, 2);
    });
    it("should remove the node from specified index and return the value of removed index when the index is valid", () => {
      const sl = new SinglyLinkedList();

      sl.push(1);
      sl.push(2);
      sl.push(3);

      assert.strictEqual(sl.length, 3);
      assert.strictEqual(sl.remove(1), 2);
      assert.strictEqual(sl.length, 2);
    });
  });
  describe("reverse", () => {
    it("should reverse the linked list", () => {
      const sl = SinglyLinkedList.from(1, 2, 3);
      const reversed = SinglyLinkedList.from(3, 2, 1);

      assert.strictEqual(sl.head.val, 1);
      assert.strictEqual(sl.get(1), 2);
      assert.strictEqual(sl.tail.val, 3);

      sl.reverse();

      assert.strictEqual(sl.equals(reversed), true);
    });
  });
});
