class MyNumber {
  #value;

  constructor(value) {
    this.#value = value;
  };

  get value() {
    return this.#value;
  };

  set value(value) {
    this.#value = value;
  };
};

