const net = require('node:net');

const toNumber = (numberText) => +numberText;

const generateRandom = (range) => {
  const from = range.from || 0;
  const to = range.to;

  return Math.round(Math.random() * (to - from)) + from;
};

class Game {
  #number;
  #noOfChances;
  #hasWon;
  #isOver;

  constructor(number, noOfChances) {
    this.#number = number;
    this.#noOfChances = noOfChances;
    this.#hasWon = false;
    this.#isOver = false;
  }

  accountGuess(number) {
    this.#noOfChances--;

    const equal = number === this.#number;
    const high = number > this.#number;
    const low = number < this.#number;

    if (equal) {
      this.#hasWon = true;
      this.#isOver = true;
    }

    if (this.#noOfChances === 0) this.#isOver = true;

    return {
      isOver: this.#isOver,
      hasWon: this.#hasWon,
      isOver: this.#isOver,
      hint: { high, low },
    };
  }
}

const findSatisfiedCondition = (hint) =>
  Object.entries(hint).find(([, condition]) => condition);

const playGuessGame = (client, game, secretNumber) => {
  client.on('data', (numberText) => {
    const number = +numberText;
    const { isOver, hasWon, hint } = game.accountGuess(number);
    client.write(JSON.stringify({ hint, isOver, hasWon, secretNumber }));

    if (isOver) {
      client.end();
      return;
    }

    const [numStatus] = findSatisfiedCondition(hint);
    console.log(`${number}: ${numStatus}`);
  });
};

const setupConnection = (guessGameServer, range, noOfChances) => {
  guessGameServer.on('connection', (client) => {
    console.log('---- New Player Joined!!! ----');
    const secretNumber = generateRandom({ ...range });
    const game = new Game(secretNumber, noOfChances);

    playGuessGame(client, game, secretNumber);
  });
};

const main = () => {
  const [from = 0, to = 100] = process.argv.slice(2, 4).map(toNumber);
  const range = { from, to };
  const noOfChances = 8;
  const guessGameServer = net.createServer();

  guessGameServer.listen(8000, () => {
    console.log('started game server...');
  });

  setupConnection(guessGameServer, range, noOfChances);
};

main();
