class TodoRepository {
  #fs;
  #path;
  #logger;

  constructor(path, fs, logger) {
    this.#fs = fs;
    this.#path = path;
    this.#logger = logger;
  }

  updateTodos(todos) {
    this.#fs.writeFile(this.#path, JSON.stringify(todos, null, 2), (err) => {
      if (err) this.#logger.log('error occurred');
    });
  }

  getPreviousTodos() {
    if (this.#fs.existsSync(this.#path)) {
      const content = this.#fs.readFileSync(this.#path, 'utf-8');
      return JSON.parse(content || '[]');
    }

    return [];
  }
}

module.exports = { TodoRepository };
