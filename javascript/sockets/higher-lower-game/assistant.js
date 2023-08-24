const net = require('node:net');
const GameSolver = require('./src/models/game-solver');
const runAssistantClient = require('./src/controllers/assistant-controller');
const { toNumber } = require('./src/utils/number-utils');

const main = () => {
  const [from = 0, to = 100] = process.argv.slice(2, 4).map(toNumber);
  const range = { from, to };
  const gameSolver = new GameSolver(range);
  const gameSolverClient = net.createConnection(8000);

  runAssistantClient(gameSolverClient, gameSolver);
};

main();
