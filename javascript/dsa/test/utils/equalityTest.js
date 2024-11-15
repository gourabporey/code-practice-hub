import assert from "node:assert";
import { describe, it } from "node:test";
import { isDeepStrictEqual } from "../../src/utils/equality.js";
import SinglyLinkedList from "../../src/SinglyLinkedList.js";

describe("isDeepStrictEqual", () => {
  it("should value check value types", () => {
    assert.strictEqual(isDeepStrictEqual(4, 5), false);
    assert.strictEqual(isDeepStrictEqual("4", "4"), true);
  });
  it("should not be equal for different types", () => {
    assert.strictEqual(isDeepStrictEqual("4", 4), false);
  });
  it("should be equal for array with exact same value type elements", () => {
    const a = [1, 2, 3, 4];
    const b = [1, 2, 3, 4];
    assert.strictEqual(isDeepStrictEqual(a, b), true);
  });
  it("should be equal for array with reference type elements comparing in depth", () => {
    const a = [1, 2, { value: 3 }, 4];
    const b = [1, 2, { value: 3 }, 4];
    assert.strictEqual(isDeepStrictEqual(a, b), true);

    const c = [1, 2, { value: 3 }, 4];
    const d = [1, { value: 2 }, 3, 4];
    assert.strictEqual(isDeepStrictEqual(c, d), false);
  });
  it("should be equal for the same elements in singly linked lists", () => {
    const a = new SinglyLinkedList();
    a.push(1);
    a.push(2);
    a.push(3);

    const b = new SinglyLinkedList();
    b.push(1);
    b.push(2);
    b.push(3);

    assert.deepStrictEqual(isDeepStrictEqual(a, b), true);
  });
  it("should not be equal for the different elements in singly linked lists", () => {
    const a = new SinglyLinkedList();
    a.push(1);
    a.push(2);
    a.push(3);

    const b = new SinglyLinkedList();
    b.push(1);
    b.push(5);
    b.push(3);

    assert.deepStrictEqual(isDeepStrictEqual(a, b), false);
  });
});
