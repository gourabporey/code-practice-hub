import { assert, expect } from "chai";
import { describe, it } from "node:test";
import DoublyLinkedList from "../src/DoublyLinkedList.js";

describe("DoublyLinkedList", () => {
  describe("push", () => {
    it("should push on empty list and head and tail both point to the same node", () => {
      const dll = new DoublyLinkedList();

      dll.push(1);

      expect(dll.length).to.equal(1);
      expect(dll.head).to.equal(dll.tail);
      expect(dll.head.val).to.equal(1);
      expect(dll.head.next).to.be.null;
      expect(dll.head.prev).to.be.null;
    });

    it("should add a new node at the tail of a non-empty list", () => {
      const dll = new DoublyLinkedList();

      dll.push("first item");
      expect(dll.length).to.equal(1);
      expect(dll.tail.val).to.equal("first item");

      dll.push("second item");
      expect(dll.length).to.equal(2);
      expect(dll.tail.val).to.equal("second item");
      expect(dll.tail.prev.val).to.equal("first item");
    });
  });

  describe("pop", () => {
    it("should return undefined when there is no element in the linkedlist", () => {
      const dll = new DoublyLinkedList();
      expect(dll.pop()).to.be.undefined;
    });

    it("should make the list empty when there is only one element in the linked list", () => {
      const dll = new DoublyLinkedList();
      dll.push("first item");

      expect(dll.pop()).to.equal("first item");
      expect(dll.length).to.equal(0);
      expect(dll.head).to.be.null;
      expect(dll.tail).to.be.null;
    });

    it("should pop the last element and shift the tail to previous to tail", () => {
      const dll = new DoublyLinkedList();
      dll.push("first item");
      dll.push("second item");
      dll.push("third item");

      expect(dll.length).to.equal(3);

      expect(dll.pop()).to.equal("third item");
      expect(dll.length).to.equal(2);
      expect(dll.tail.val).to.equal("second item");
    });
  });

  describe("shift", () => {
    it("should return undefined when linked list is empty", () => {
      const dl = new DoublyLinkedList();
      expect(dl.shift()).to.be.undefined;
    });

    it("should make the list empty if the list is of length 1", () => {
      const dl = new DoublyLinkedList();
      dl.push("first item");

      expect(dl.shift()).to.equal("first item");
      expect(dl.length).to.equal(0);
    });

    it("should shift the head to the next node of the head, and return the removed node value", () => {
      const dl = new DoublyLinkedList();
      dl.push("first item");
      dl.push("second item");
      dl.push("third item");

      expect(dl.shift()).to.equal("first item");
      expect(dl.length).to.equal(2);
      expect(dl.head.val).to.equal("second item");
      expect(dl.head.prev).to.be.null;
    });
  });

  describe("unshift", () => {
    it("should add the node and make it head and tail both if the list is empty", () => {
      const dl = new DoublyLinkedList();

      expect(dl.head).to.be.null;
      expect(dl.tail).to.be.null;

      dl.unshift(1);

      expect(dl.head.val).to.equal(1);
      expect(dl.tail.val).to.equal(1);
    });

    it("should add the node and shift head to new node when list is not empty", () => {
      const dl = new DoublyLinkedList();
      dl.push(1);
      dl.push(2);

      expect(dl.head.val).to.equal(1);
      expect(dl.length).to.equal(2);

      dl.unshift(5);

      expect(dl.head.val).to.equal(5);
      expect(dl.length).to.equal(3);
    });
  });

  describe("get", () => {
    it("should return undefined for index less than zero", () => {
      const dl = new DoublyLinkedList();
      dl.push(1);
      dl.push(2);
      expect(dl.get(-1)).to.be.undefined;
    });

    it("should return undefined for index greater than or equal to list length", () => {
      const dl = new DoublyLinkedList();
      dl.push(1);
      dl.push(2);
      expect(dl.get(2)).to.be.undefined;
      expect(dl.get(3)).to.be.undefined;
    });

    it("should return the element value of the specified index", () => {
      const dl = new DoublyLinkedList();
      dl.push(1);
      dl.push(2);
      dl.push(3);
      dl.push(4);
      dl.push(5);
      dl.push(6);

      expect(dl.get(0)).to.equal(1);
      expect(dl.get(1)).to.equal(2);
      expect(dl.get(4)).to.equal(5);
    });
  });

  describe("set", () => {
    it("should return false if the index is out of bound", () => {
      const dl = new DoublyLinkedList();
      expect(dl.set(1, "value")).to.be.false;
      expect(dl.length).to.equal(0);
    });

    it("should set the node value if the index is in range", () => {
      const dl = new DoublyLinkedList();
      dl.push(1);
      dl.push(2);
      dl.push(3);
      dl.push(4);

      expect(dl.set(1, 20)).to.be.true;
      expect(dl.length).to.equal(4);
      expect(dl.get(1)).to.equal(20);
    });
  });

  describe("insert", () => {
    it("should return false if the index if out of bound", () => {
      const dl = new DoublyLinkedList();
      expect(dl.insert(1, 78)).to.be.false;
    });

    it("should unshift if the index is 0", () => {
      const dl = new DoublyLinkedList();
      dl.push("item1");

      expect(dl.length).to.equal(1);

      expect(dl.insert(0, "new item")).to.be.true;
      expect(dl.head.val).to.equal("new item");
      expect(dl.length).to.equal(2);
    });

    it("should push if the index is equal to list length", () => {
      const dl = new DoublyLinkedList();
      dl.push(1);
      dl.push(2);
      dl.push(3);

      expect(dl.length).to.equal(3);

      expect(dl.insert(3, 4)).to.be.true;
      expect(dl.tail.val).to.equal(4);
      expect(dl.length).to.equal(4);
    });

    it("should insert the value at specified index which is in range", () => {
      const dl = new DoublyLinkedList();
      dl.push(1);
      dl.push(2);
      dl.push(3);

      expect(dl.length).to.equal(3);

      expect(dl.insert(1, 5)).to.be.true;
      expect(dl.length).to.equal(4);
      expect(dl.get(1)).to.equal(5);
    });
  });

  describe("remove", () => {
    it("should shift if the index is 0", () => {
      const dl = new DoublyLinkedList();
      dl.push(1);
      dl.push(2);
      dl.push(3);
      dl.push(4);

      expect(dl.length).to.equal(4);
      expect(dl.remove(0)).to.equal(1);
      expect(dl.head.val).to.equal(2);
      expect(dl.length).to.equal(3);
    });

    it("should pop the last node if the index is equal list length - 1", () => {
      const dl = new DoublyLinkedList();
      dl.push(1);
      dl.push(2);
      dl.push(3);
      dl.push(4);

      expect(dl.length).to.equal(4);
      expect(dl.remove(3)).to.equal(4);
      expect(dl.length).to.equal(3);
    });

    it("should return the removed node value and decrease the list length", () => {
      const dl = new DoublyLinkedList();
      dl.push(1);
      dl.push(2);
      dl.push(3);
      dl.push(4);

      expect(dl.length).to.equal(4);
      expect(dl.remove(1)).to.equal(2);
      expect(dl.length).to.equal(3);
    });
  });

  describe("reverse", () => {
    it("should give the same list when length is less than equal 1", () => {
      const dl = new DoublyLinkedList();
      dl.push(1);

      assert.strictEqual(dl.head.val, 1);
      assert.strictEqual(dl.tail.val, 1);

      dl.reverse();

      assert.strictEqual(dl.head.val, 1);
      assert.strictEqual(dl.tail.val, 1);
    });

    it("should reverse the head and tail for length equal to 2", () => {
      const dl = new DoublyLinkedList();
      dl.push(1);
      dl.push(2);

      assert.strictEqual(dl.head.val, 1);
      assert.strictEqual(dl.tail.val, 2);

      dl.reverse();

      assert.strictEqual(dl.head.val, 2);
      assert.strictEqual(dl.tail.val, 1);
    });
  });
});
