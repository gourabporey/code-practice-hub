class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class Stack {
  #first;
  #last;
  #size;

  constructor() {
    this.#first = null;
    this.#last = null;
    this.#size = 0;
  }

  get size() {
    return this.#size;
  }

  get top() {
    return this.#first?.value || null;
  }

  push(value) {
    const newNode = new Node(value, this.#first);

    if (this.#size === 0) {
      this.#last = newNode;
    }

    this.#first = newNode;
    this.#size++;
    return this.#size;
  }

  pop() {
    if (this.#size === 0) return null;

    const poppedValue = this.#first.value;
    this.#first = this.#first.next;
    this.#size--;

    if (this.#size === 1) {
      this.#last = null;
    }

    return poppedValue;
  }
}

export default Stack;
