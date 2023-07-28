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
      hint: { high, low },
    };
  }
}

const playGuessGame = (client, range, noOfChances) => {
  console.log('---- New Player Joined!!! ----');
  const secretNumber = generateRandom({ ...range });
  const game = new Game(secretNumber, noOfChances);

  client.on('data', (numberText) => {
    const number = +numberText;
    const { isOver, hasWon, hint } = game.accountGuess(number);
    const msg = hasWon
      ? `Yooooo! You won, Correctly guessed ${secretNumber}\n`
      : `Oops, Correct Number was: ${secretNumber}\n`;

    if (isOver) {
      client.write(JSON.stringify({ msg }));
      client.end();
      return;
    }

    const [numStatus] = Object.entries(hint).find(([, condition]) => condition);
    console.log(`${number}: ${numStatus}`);
    client.write(JSON.stringify({ hint }));
  });
};

const runGuessGameServer = (guessGameServer, range, noOfChances) => {
  guessGameServer.on('connection', (client) => {
    playGuessGame(client, range, noOfChances);
  });

  guessGameServer.on('end', () => {
    console.log('Another Game?\n');
  });
};

const main = () => {
  const range = { from: 1, to: 100 };
  const noOfChances = 8;

  const guessGameServer = net.createServer();

  guessGameServer.listen(8000, () => {
    console.log('started game server...');
  });

  runGuessGameServer(guessGameServer, range, noOfChances);
};

main();
