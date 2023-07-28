const net = require('node:net');

class GameSolver {
  constructor({ from, to }) {
    this.from = from;
    this.to = to;
    this.number = this.getAverage(from, to);
  }

  getAverage(a, b) {
    return Math.round((a + b) / 2);
  }

  giveSuggestion({ high }) {
    if (high) {
      this.to = this.number;
    } else {
      this.from = this.number + 1;
    }

    this.number = this.getAverage(this.to, this.from);

    return this.number;
  }
}

const runAssistantClient = (gameSolverClient, gameSolver) => {
  gameSolverClient.on('connect', () => {
    console.log('Here your assistant goes!!!');
    const number = gameSolver.giveSuggestion({ high: true });
    gameSolverClient.write(number.toString());

    gameSolverClient.setEncoding('utf-8');
    gameSolverClient.on('data', (data) => {
      const response = JSON.parse(data);
      const { msg, hint } = response;

      if (msg) {
        console.log(msg);
        return;
      }

      const number = gameSolver.giveSuggestion(hint);
      gameSolverClient.write(number.toString());
    });
  });
};

const main = () => {
  const range = { from: 1, to: 100 };
  const gameSolver = new GameSolver(range);
  const gameSolverClient = net.createConnection(8000);
  runAssistantClient(gameSolverClient, gameSolver);
};

main();
