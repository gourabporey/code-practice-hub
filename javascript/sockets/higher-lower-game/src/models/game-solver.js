class GameSolver {
  #from;
  #to;
  #number;

  constructor({ from, to }) {
    this.#from = from;
    this.#to = to;
    this.#number = this.#getAverage(from, to);
  }

  getFirstSuggestion() {
    return this.#number;
  }

  #getAverage(a, b) {
    return Math.round((a + b) / 2);
  }

  giveSuggestion({ high }) {
    if (high) {
      this.#to = this.#number;
    } else {
      this.#from = this.#number;
    }

    this.#number = this.#getAverage(this.#to, this.#from);

    return this.#number;
  }
}

module.exports = GameSolver;
