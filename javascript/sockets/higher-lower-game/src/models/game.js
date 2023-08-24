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

module.exports = { Game };
