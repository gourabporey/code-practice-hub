const net = require('node:net');

const toNumber = (numberText) => +numberText;

class GameSolver {
  #from;
  #to;
  #number;

  constructor({ from, to }) {
    this.#from = from;
    this.#to = to;
    this.#number = this.#getAverage(from, to);
  }

  getFirstSuggestion() {
    return this.#number;
  }

  #getAverage(a, b) {
    return Math.round((a + b) / 2);
  }

  giveSuggestion({ high }) {
    if (high) {
      this.#to = this.#number;
    } else {
      this.#from = this.#number;
    }

    this.#number = this.#getAverage(this.#to, this.#from);

    return this.#number;
  }
}

const generateGameOverMsg = (hasWon, secretNumber) =>
  hasWon
    ? `Yooooo! You won, Correctly guessed ${secretNumber}\n`
    : `Oops, Correct Number was: ${secretNumber}\n`;

const runAssistantClient = (gameSolverClient, gameSolver) => {
  gameSolverClient.on('connect', () => {
    const initialGuess = gameSolver.getFirstSuggestion();
    gameSolverClient.write(initialGuess.toString());

    console.log('Here your assistant goes!!!');
    console.log(`Guessed: ${initialGuess}`);

    gameSolverClient.setEncoding('utf-8');
    gameSolverClient.on('data', (data) => {
      setTimeout(() => {
        const response = JSON.parse(data);
        const { isOver, hasWon, hint, secretNumber } = response;

        if (isOver) {
          const msg = generateGameOverMsg(hasWon, secretNumber);
          console.log(msg);
          return;
        }

        const number = gameSolver.giveSuggestion(hint);
        console.log(`Guessed: ${number}`);
        gameSolverClient.write(number.toString());
      }, 1000);
    });
  });
};

const main = () => {
  const [from, to] = process.argv.slice(2, 4).map(toNumber);
  const range = { from, to };
  const gameSolver = new GameSolver(range);
  const gameSolverClient = net.createConnection(8000);

  runAssistantClient(gameSolverClient, gameSolver);
};

main();
