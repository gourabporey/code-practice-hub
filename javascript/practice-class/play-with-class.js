class WaterBottle {
  #brand;
  #capacity;
  #quantity;

  constructor(brand, capacity) {
    this.#brand = brand;
    this.#capacity = capacity;
    this.#quantity = 0;
  };

  getBrandName() {
    return this.#brand;
  };

  getCapacity() {
    return this.#capacity;
  };

  fill(quantity) {
    this.#quantity += quantity;
  };

  checkQty() {
    return this.#quantity;
  };
};

class Calculator {
  add(a, b) {
    return a + b;
  };
};
