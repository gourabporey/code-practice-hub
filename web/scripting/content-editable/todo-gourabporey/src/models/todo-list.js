class TodoList {
  #id;
  #todos;
  #heading;
  #deleted;

  constructor({ id, heading, deleted = false }) {
    this.#id = id;
    this.#todos = [];
    this.#heading = heading;
    this.#deleted = deleted;
  }

  get id() {
    return this.#id;
  }

  get heading() {
    return this.#heading;
  }

  get deleted() {
    return this.#deleted;
  }

  delete() {
    this.#deleted = true;
  }

  addTodo(todo) {
    this.#todos.push(todo);
    return todo.toJSON();
  }

  #findTodoOfId(todoId) {
    return this.#todos.find((todo) => todo.id === todoId);
  }

  deleteTodoOfId(todoId) {
    const todo = this.#findTodoOfId(todoId);
    todo.delete();
  }

  getAllTodos() {
    return this.#todos.map((todo) => todo.toJSON());
  }

  toggleTodoStatus(todoId) {
    const todo = this.#findTodoOfId(todoId);
    todo.toggleMarkStatus();
    return todo.toJSON();
  }

  toJSON() {
    return {
      id: this.#id,
      heading: this.#heading,
      deleted: this.#deleted,
      todos: this.getAllTodos(),
    };
  }
}

module.exports = { TodoList };
