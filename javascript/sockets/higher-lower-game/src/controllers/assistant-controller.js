const generateGameOverMsg = (hasWon, secretNumber) =>
  hasWon
    ? `Yooooo! You won, Correctly guessed ${secretNumber}\n`
    : `Oops, Correct Number was: ${secretNumber}\n`;

const suggestNumberOnHint = (gameSolverClient, gameSolver) => {
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
    }, 500);
  });
};

const runAssistantClient = (gameSolverClient, gameSolver) => {
  gameSolverClient.on('connect', () => {
    const initialGuess = gameSolver.getFirstSuggestion();
    gameSolverClient.write(initialGuess.toString());

    console.log('Here your assistant goes!!!');
    console.log(`Guessed: ${initialGuess}`);

    suggestNumberOnHint(gameSolverClient, gameSolver);
  });
};

module.exports = runAssistantClient;
