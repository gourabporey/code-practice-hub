const net = require('node:net');

const generateRandom = (range) => {
  const from = range.from || 0;
  const to = range.to;

  return Math.round(Math.random() * (to - from)) + from;
};

const averageOf = ({ from, to }) => Math.round((from + to) / 2);

const compareSecondToFirst = (a, b) => {
  if (a === b) return 'equal';
  if (a > b) return 'low';
  return 'high';
};

const playGuessGame = (client, range, noOfChances) => {
  client.write('Welcome to Guess Game\n');
  const secretNumber = generateRandom({ ...range });
  const numbers = { ...range };
  let totalAttemptsMade = 0;

  const checkNumberAndUpdate = (numberText) => {
    totalAttemptsMade++;

    const number = +numberText;
    const result = compareSecondToFirst(secretNumber, number);

    console.log(`${number}: ${result}`);

    let isGameOver = false;

    if (result === 'equal') {
      isGameOver = true;
      client.write('You Won!!!\n');
    }

    if (totalAttemptsMade === noOfChances) {
      isGameOver = true;
      client.write('Game over\n');
    }

    if (isGameOver) {
      client.end();
      return;
    }

    const attribute = result === 'low' ? 'from' : 'to';
    numbers[attribute] = number;
    client.write(`I predict: ${averageOf(numbers)}\n`);
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
  const range = { from: 0, to: 50 };
  const noOfChances = 5;
  runGuessGameServer(range, noOfChances);
};

main();
