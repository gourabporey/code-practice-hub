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

      this.#IOController.sendData(JSON.stringify(status));

      if (status.isOver) this.#IOController.stop();
    });
  }
}

module.exports = { GameController };
