const and = (...args) => args.every(a => a);
class REPL {
   #io
   #calculator
   #parser

   constructor(io, calculator, parser) {
      this.#io = io;
      this.#calculator = calculator;
      this.#parser = parser;
   }

   #isValid(operand) {
      const validOperand = /^\d*[+-]\d*i$/;
      return validOperand.test(operand);
   }

   processLine(line) {
      const { operator, complex: operand } = this.#parser.parse(line);

      const validOperators = this.#calculator.validOperators;
      const isValidOperator = validOperators.includes(operator);
      const isValidOperand = this.#isValid(operand);
      const cantProcess = !and(isValidOperand, isValidOperator);

      if (cantProcess) {
         this.#io.writeLine(validOperators.join(' '));
         return;
      }

      this.#calculator.operate(operator, operand);
      this.#calculator.renderBalance((content) => this.#io.writeLine(content));
   }

   run() {
      this.#io.watchInputLine(this.processLine.bind(this));
   }
}
exports.REPL = REPL;