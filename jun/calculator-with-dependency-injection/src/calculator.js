const operations = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b
};

class Calculator {
  #balance;

  constructor(balance = 0) {
    this.#balance = balance;
  }

  get validOperators() {
    return Object.keys(operations);
  }

  renderBalance(render) {
    render(this.#balance);
  }

  operate(operator, operand) {
    this.#balance = operations[operator](this.#balance, operand);
  }
}

exports.Calculator = Calculator;