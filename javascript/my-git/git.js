const Commit = require("./src/commit");

class Git {
  #lastCommitId = -1;
  #history = [];

  constructor(name) {
    this.head = null;
    this.name = name;
  }

  commit(message) {
    const commit = new Commit(++this.#lastCommitId, message);
    this.HEAD = commit;
    this.#history.unshift(commit);
    return commit;
  }

  log() {
    const history = this.#history.map(commit => ({ id: commit.id, message: commit.message }));
    return history;
  }
}

module.exports = Git;
