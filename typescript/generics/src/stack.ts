const makeCopy = <T>(t: T): T => JSON.parse(JSON.stringify(t));

export default class Stack<T> {
  #elements: Array<T>;

  constructor() {
    this.#elements = [];
  }

  push(element: T): Stack<T> {
    this.#elements.push(element);
    return this;
  }

  pop(): T | undefined {
    return this.#elements.pop();
  }

  clear(): void {
    this.#elements = [];
  }

  peek(): T | undefined {
    return this.#elements.at(-1);
  }

  toArray() {
    return makeCopy(this.#elements);
  }
}
