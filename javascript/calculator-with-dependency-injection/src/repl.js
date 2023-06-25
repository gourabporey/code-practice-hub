const and = (...args) => args.every(a => a);
class REPL {
  #io
  #calculator
  constructor(io, calculator) {
    this.#io = io;
    this.#calculator = calculator;
  }

  processLine(line) {
    const [operator, operandText] = line.split(' ');
    const operand = +operandText;

    const validOperators = this.#calculator.validOperators;
    const isValidOperator = validOperators.includes(operator);
    const isValidOperand = !isNaN(operand);
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