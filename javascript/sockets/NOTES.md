class Game {
constructor(range, noOfChances, IOController) {
this.range = { ...range };
this.noOfChances = noOfChances;
this.IOController = IOController;
this.totalAttemptsMade = 0;
this.number = generateRandom(this.range);
}

compareNumber(number) {
this.totalAttemptsMade++;
const result = compareSecondToFirst(this.number, number);
this.IOController.write(`${result}\n`);

    if(result === equal)

}

start() {
this.IOController.write('Welcome to Guess game\n\n');

    this.IOController.on('data', (numberText) =>
      this.compareNumber(+numberText)
    );

}
}

```js
const net = require('node:net');

const generateRandom = (range) => {
  const from = range.from || 0;
  const to = range.to;

  return Math.round(Math.random() * (to - from)) + from;
};

const compareSecondToFirst = (a, b) => {
  if (a === b) return 'equal';
  if (a > b) return 'low';
  else return 'high';
};

const playGuessGame = (client, range, noOfChances) => {
  client.write('Welcome to Guess Game\n');
  const secretNumber = generateRandom({ ...range });
  let totalAttemptsMade = 0;

  client.on('data', (numberText) => {
    totalAttemptsMade++;
    const number = +numberText;
    const result = compareSecondToFirst(secretNumber, number);
    client.write(`${result}\n\n`);

    if (result === 'equal' || totalAttemptsMade === noOfChances) {
      client.end();
    }
  });
};

const runGuessGameServer = (range, noOfChances) => {
  const guessGameServer = net.createServer();

  guessGameServer.listen(8000, () => {
    console.log('started game server...');
  });

  guessGameServer.on('connection', (client) =>
    playGuessGame(client, range, noOfChances)
  );
};

const predictNumber = (socket, range) => {
  const numbers = { ...range };

  socket.write('I am your assistant\n');
  socket.setEncoding('utf-8');

  socket.on('data', (hint) => {
    const [numberText, status] = hint.trim().split(/\s+/);
    const number = +numberText;
    const attribute = status === 'low' ? 'from' : 'to';
    numbers[attribute] = number;

    socket.write(`I predict: ${generateRandom(numbers)}\n`);
  });
};

const runSolverServer = (range) => {
  const solverServer = net.createServer();

  solverServer.listen(9000, () => {
    console.log('started solver server...');
  });

  solverServer.on('connection', (socket) => predictNumber(socket, range));
};

const main = () => {
  const range = { from: 0, to: 100 };
  const noOfChances = 5;
  runGuessGameServer(range, noOfChances);
  runSolverServer(range);
};

main();
```

```js
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
    console.log(Math.floor((a + b) / 2));
    return Math.floor((a + b) / 2);
  }

  giveSuggestion({ high, low }) {
    if (high) {
      this.to = this.number;
    } else {
      this.from = this.number + 1;
    }

    this.number = this.getAverage(this.to, this.from);

    return this.number;
  }
}
```
