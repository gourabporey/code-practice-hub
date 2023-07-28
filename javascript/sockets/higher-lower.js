const net = require('node:net');

const generateRandom = (range) => {
  const from = range.from || 0;
  const to = range.to;

  return Math.round(Math.random() * (to - from)) + from;
};

class Game {
  constructor(number, noOfChances) {
    this.number = number;
    this.noOfChances = noOfChances;
    this.hasWon = false;
    this.isOver = false;
  }

  accountGuess(number) {
    this.noOfChances--;

    const equal = number === this.number;
    const high = number > this.number;
    const low = number < this.number;

    if (equal) {
      this.hasWon = true;
      this.isOver = true;
    }

    if (this.noOfChances === 0) this.isOver = true;

    return {
      isOver: this.isOver,
      hasWon: this.hasWon,
      isOver: this.isOver,
      stat: { high, low },
    };
  }
}

class GameSolver {
  constructor({ from, to }) {
    this.from = from;
    this.to = to;
    this.number = this.getAverage(from, to);
  }

  getAverage(a, b) {
    return Math.floor((a + b) / 2);
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

const playGuessGame = (client, range, noOfChances) => {
  client.write('Welcome to Guess Game\n');
  client.write(`Guess a number between ${range.from} to ${range.to}\n`);
  const secretNumber = generateRandom({ ...range });

  const game = new Game(secretNumber, noOfChances);
  const gameSolver = new GameSolver(range);

  const checkNumberAndUpdate = (numberText) => {
    const number = +numberText;
    const { isOver, hasWon, stat } = game.accountGuess(number);

    const gameOverMsg = hasWon ? 'Yooooo! You won\n' : 'Game Over\n';

    if (isOver) {
      client.write(gameOverMsg);
      client.end();
      return;
    }

    const [numStatus] = Object.entries(stat).find(
      (condition) => condition[1] === true
    );

    console.log(`${number}: ${numStatus}`);

    const newNumSuggestion = gameSolver.giveSuggestion(stat);
    client.write(`I predict: ${newNumSuggestion}\n`);
  };

  client.on('data', checkNumberAndUpdate);
};

const runGuessGameServer = (range, noOfChances) => {
  const guessGameServer = net.createServer();

  guessGameServer.listen(8000, () => {
    console.log('started game server...');
  });

  guessGameServer.on('connection', (client) => {
    playGuessGame(client, range, noOfChances);
  });
};

const main = () => {
  const range = { from: 0, to: 10 };
  const noOfChances = 5;
  runGuessGameServer(range, noOfChances);
};

main();
