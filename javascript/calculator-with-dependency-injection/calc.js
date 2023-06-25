const { Calculator } = require("./src/calculator");
const { IO } = require("./src/io");
const { REPL } = require("./src/repl");

const main = () => {
  const calculator = new Calculator();
  const io = new IO(process.stdin, process.stdout, { setInterval, clearInterval });
  const repl = new REPL(io, calculator);
  repl.run();
}

main();