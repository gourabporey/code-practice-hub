const net = require('node:net');
const { generateRandom } = require('./src/utils/random-number-generator');
const { Game } = require('./src/models/game');
const { SocketController } = require('./src/controllers/socket-controller');
const { GameController } = require('./src/controllers/game-controller');
const { toNumber } = require('./src/utils/number-utils');

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
