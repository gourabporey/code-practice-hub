const { IO } = require("calculator");
const { Calculator } = require('./src/calculator')
const { Parser } = require("./src/parser");
const { REPL } = require("./src/REPL");
const { ComplexNumber, Real, Imaginary } = require("complex_number");

const main = () => {
   const parser = new Parser();
   const initialBalance = new ComplexNumber(new Real(0), new Imaginary(new Real(0)));
   const calculator = new Calculator(initialBalance);
   const io = new IO(process.stdin, process.stdout);
   const repl = new REPL(io, calculator, parser);
   repl.run();
}

main();