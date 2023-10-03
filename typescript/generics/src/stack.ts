export default class Stack<T> {
  #elements: Array<T>;

  constructor() {
    this.#elements = [];
  }

  push(element: T) {
    this.#elements.push(element);
  }

  pop(): T {
    const topElement = this.#elements.pop();
    if (topElement === undefined) throw new Error('Stack Underflow');
    return topElement;
  }
}
