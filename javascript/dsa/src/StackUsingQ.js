import Queue from "./Queue.js";

class StackUsingQueue {
  constructor() {
    this.q1 = new Queue(); // It will contain all other elements than the top element
    this.q2 = new Queue(); // It will contain the top element
    this.size = 0;
  }

  push(val) {
    if (this.q2.size === 1) {
      const lastElem = this.q2.deQueue();
      this.q1.enQueue(lastElem);
    }

    this.q2.enQueue(val);
    this.size++;
    return this;
  }

  pop() {
    if (this.q2.size === 0) return null;

    if (this.q1.size === 0) {
      const item = this.q2.deQueue();
      this.size--;
      return item;
    }

    const item = this.q2.deQueue();
    this.rearrange();

    this.size--;
    return item;
  }

  rearrange() {
    while (this.q1.size > 1) {
      const item = this.q1.deQueue();
      this.q2.enQueue(item);
    }
    [this.q1, this.q2] = [this.q2, this.q1];
  }
}

export default StackUsingQueue;
