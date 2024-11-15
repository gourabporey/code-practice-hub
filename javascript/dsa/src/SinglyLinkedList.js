import { isDeepStrictEqual } from "./utils/equality.js";

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (this.head == null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (this.length === 0) return undefined;

    let curr = this.head;
    let pre = curr;

    while (curr.next != null) {
      pre = curr;
      curr = curr.next;
    }

    pre.next = null;
    this.tail = pre;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return curr.val;
  }

  shift() {
    if (this.length === 0) return undefined;
    const currHead = this.head;
    this.head = this.head.next;
    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }

    return currHead.val;
  }

  unshift(val) {
    const newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  #getNodeOfIndex(index) {
    if (index < 0 || index >= this.length) return undefined;
    let current = this.head;
    let counter = 0;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  get(index) {
    return this.#getNodeOfIndex(index)?.val;
  }

  set(index, value) {
    const foundNode = this.#getNodeOfIndex(index);
    if (!foundNode) {
      throw new Error(
        `Index cannot be less than 0 or Greater than ${this.length}, provided index ${index}`
      );
    }
    foundNode.val = value;
    return true;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) {
      this.unshift(value);
      return true;
    }
    if (index === this.length) {
      this.push(value);
      return true;
    }
    const preNode = this.#getNodeOfIndex(index - 1);
    const newNode = new Node(value);
    newNode.next = preNode.next;
    preNode.next = newNode;
    this.length++;

    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return false;
    if (index === 0) return this.shift();
    if (index == this.length - 1) return this.pop();

    const preNode = this.#getNodeOfIndex(index - 1);
    const nodeToRemove = preNode.next;
    preNode.next = nodeToRemove.next;
    this.length--;

    return nodeToRemove.val;
  }

  reverse() {
    if (this.length <= 1) return this;
    let prevNode = null;
    let currNode = this.head;
    let nextNode = currNode.next;
    [this.head, this.tail] = [this.tail, this.head];

    while (currNode) {
      currNode.next = prevNode;
      prevNode = currNode;
      currNode = nextNode;
      nextNode = currNode?.next;
    }

    return this;
  }

  equals(another) {
    if (this.length !== another.length) return false;
    if (this.head.val !== another.head.val) return false;
    if (this.tail.val !== another.tail.val) return false;

    let currNode = this.head;
    let anotherCurrnNode = another.head;

    while (currNode) {
      if (!isDeepStrictEqual(currNode.val, anotherCurrnNode.val)) return false;
      currNode = currNode.next;
      anotherCurrnNode = anotherCurrnNode.next;
    }

    return true;
  }

  static from(...elements) {
    const sl = new SinglyLinkedList();
    elements.forEach((elem) => sl.push(elem));
    return sl;
  }
}

export default SinglyLinkedList;
