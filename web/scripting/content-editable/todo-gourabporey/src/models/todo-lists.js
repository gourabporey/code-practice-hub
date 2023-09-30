class TodoLists {
  #todoLists;

  constructor() {
    this.#todoLists = [];
  }

  #findTodoList(todoListId) {
    return this.#todoLists.find((list) => list.id === todoListId);
  }

  addTodoList(todoList) {
    this.#todoLists.push(todoList);
    return todoList.toJSON();
  }

  deleteTodoList(todoListId) {
    const todoList = this.#findTodoList(todoListId);
    todoList.delete();
  }

  addTodo(todoListId, todo) {
    const todoList = this.#findTodoList(todoListId);
    return todoList.addTodo(todo);
  }

  toggleTodoStatus(todoId, todoListId) {
    const todoList = this.#findTodoList(todoListId);
    return todoList.toggleTodoStatus(todoId);
  }

  deleteTodo(todoId, todoListId) {
    const todoList = this.#findTodoList(todoListId);
    todoList.deleteTodoOfId(todoId);
  }

  getAllTodosOfId(todoListId) {
    const todoList = this.#findTodoList(todoListId);
    return todoList.getAllTodos();
  }

  getAllTodos() {
    return this.#todoLists.map((todoList) => todoList.toJSON());
  }
}

module.exports = { TodoLists };
