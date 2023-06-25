class Calculator {
   #balance;

   constructor(balance) {
      this.#balance = balance;
   }

   get validOperators() {
      return ['add', 'multiply'];
   }

   renderBalance(render) {
      render(this.#balance);
   }

   operate(operator, operand) {
      this.#balance = this.#balance[operator](operand);
   }
}

exports.Calculator = Calculator;