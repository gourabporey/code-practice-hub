export class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);
    newNode.prev = this.tail;

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;

    return this;
  }

  pop() {
    if (this.length === 0) return undefined;
    const tail = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      const nodePreTail = this.tail.prev;
      nodePreTail.next = null;
      this.tail = nodePreTail;
    }
    this.length--;
    return tail.val;
  }

  shift() {
    if (this.length === 0) return undefined;
    const headToRemove = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = headToRemove.next;
      this.head.prev = null;
    }
    this.length--;
    return headToRemove.val;
  }

  unshift(val) {
    if (val === undefined) return this;
    const newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  getNodeAt(index) {
    if (index < 0 || index >= this.length) return undefined;

    if (index <= this.length / 2) {
      let currNode = this.head;
      for (let currIndex = 0; currIndex < index; currIndex++) {
        currNode = currNode.next;
      }
      return currNode;
    }

    let currNode = this.tail;
    for (let currIndex = this.length - 1; currIndex > index; currIndex--) {
      currNode = currNode.prev;
    }
    return currNode;
  }

  get(index) {
    return this.getNodeAt(index)?.val;
  }

  set(index, value) {
    const nodeToChange = this.getNodeAt(index);
    if (nodeToChange) {
      nodeToChange.val = value;
    }
    return nodeToChange ? true : false;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);

    const newNode = new Node(value);
    const afterNode = this.getNodeAt(index);
    const prevNode = afterNode.prev;

    newNode.next = afterNode;
    newNode.prev = prevNode;
    prevNode.next = newNode;

    this.length++;

    return true;
  }

  remove(index) {
    const nodeToRemove = this.getNodeAt(index);
    if (!nodeToRemove) return undefined;
    if (index === 0) return this.shift();
    nodeToRemove.prev.next = nodeToRemove.next;
    this.length--;
    return nodeToRemove.val;
  }

  reverse() {
    if (this.length <= 1) return this;
    if (this.length === 2) {
      [this.tail, this.head] = [this.head, this.tail];
      this.head.next = this.tail;
      this.tail.next = null;
      return this;
    }
  }
}

export default DoublyLinkedList;
