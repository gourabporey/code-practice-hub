class Todo {
  #id;
  #desc;
  #marked;
  #deleted;

  constructor({ id, description, marked = false, deleted = false }) {
    this.#id = id;
    this.#desc = description;
    this.#marked = marked;
    this.#deleted = deleted;
  }

  get id() {
    return this.#id;
  }

  get deleted() {
    return this.#deleted;
  }

  toggleMarkStatus() {
    this.#marked = !this.#marked;
  }

  delete() {
    this.#deleted = true;
  }

  toJSON() {
    return {
      id: this.#id,
      marked: this.#marked,
      deleted: this.#deleted,
      description: this.#desc,
    };
  }
}

module.exports = { Todo };
