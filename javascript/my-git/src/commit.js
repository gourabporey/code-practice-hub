class Commit {
  #id;
  #message;

  constructor(id, message) {
    this.#id = id;
    this.#message = message;
  }

  get message() {
    return this.#message;
  }

  get id() {
    return this.#id;
  }
}

module.exports = Commit;
