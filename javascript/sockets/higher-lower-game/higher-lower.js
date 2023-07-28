const net = require('node:net');

const toNumber = (numberText) => +numberText;

const generateRandom = (range) => {
  const from = range.from || 0;
  const to = range.to;
  return Math.round(Math.random() * (to - from)) + from;
};

const findSatisfiedCondition = (hint) =>
  Object.entries(hint).find(([, condition]) => condition);

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

    const secretNumber = this.#isOver ? this.#number : null;

    return {
      secretNumber,
      isOver: this.#isOver,
      hasWon: this.#hasWon,
      hint: { high, low, equal },
    };
  }
}

class SocketController {
  #socket;

  constructor(socket) {
    this.#socket = socket;
  }

  sendData(data) {
    this.#socket.write(data);
  }

  onInputReceived(sendDataToGame) {
    this.#socket.on('data', (data) => {
      sendDataToGame(data);
    });
  }

  stop() {
    this.#socket.end();
  }
}

class GameController {
  #game;
  #IOController;

  constructor(game, IOController) {
    this.#game = game;
    this.#IOController = IOController;
  }

  start() {
    this.#IOController.onInputReceived((input) => {
      const number = +input;
      const status = this.#game.accountGuess(number);
      const [numStatus] = findSatisfiedCondition(status.hint);

      this.#IOController.sendData(JSON.stringify(status));
      console.log(`${number}: ${numStatus}`);

      if (status.isOver) this.#IOController.stop();
    });
  }
}

const setupConnection = (guessGameServer, range, noOfChances) => {
  guessGameServer.on('connection', (client) => {
    console.log('---- New Player Joined!!! ----');

    const secretNumber = generateRandom({ ...range });
    const game = new Game(secretNumber, noOfChances);
    const inputController = new SocketController(client);
    const gameController = new GameController(game, inputController);

    gameController.start();
  });
};

const main = () => {
  const [from = 0, to = 100, noOfChances = 5] = process.argv
    .slice(2, 5)
    .map(toNumber);
  const range = { from, to };
  const guessGameServer = net.createServer();

  guessGameServer.listen(8000, () => {
    console.log('started game server...');
  });

  setupConnection(guessGameServer, range, noOfChances);
};

main();
