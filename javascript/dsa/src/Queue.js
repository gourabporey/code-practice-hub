class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  peek() {
    return this.first.value;
  }

  enQueue(value) {
    const newNode = new Node(value);

    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }

    this.size++;
    return this.size;
  }

  deQueue() {
    if (this.size === 0) return null;
    const deQueuedValue = this.first.value;
    this.first = this.first.next;
    if (this.size === 1) this.last = null;
    this.size--;
    return deQueuedValue;
  }
}

export default Queue;
