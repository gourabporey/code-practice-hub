const fs = require('fs');

const { Todo } = require('./models/todo');
const { TodoList } = require('./models/todo-list');
const { TodoLists } = require('./models/todo-lists');
const { TodoRepository } = require('./models/todo-repository');

class TodoListsController {
  #todoCount;
  #todoLists;
  #todoRepository;
  #todoListCount;

  constructor(todoLists, todoStorage) {
    this.#todoCount = this.#todoListCount = 0;
    this.#todoLists = todoLists;
    this.#todoRepository = todoStorage;
  }

  #restoreTodoList({ id, heading, todos, deleted }) {
    const todoList = new TodoList({ id, heading, deleted });
    this.#todoListCount = id + 1;

    todos.forEach(({ id, marked, deleted, description }) => {
      this.#todoCount = id + 1;
      todoList.addTodo(new Todo({ id, marked, deleted, description }));
    });

    this.#todoLists.addTodoList(todoList);
  }

  restoreAllTodos() {
    const previousTodoLists = this.#todoRepository.getPreviousTodos() || [];
    previousTodoLists.forEach((todoList) => this.#restoreTodoList(todoList));
  }

  #saveTodos() {
    this.#todoRepository.updateTodos(this.#todoLists.getAllTodos());
  }

  addTodoList(heading) {
    const id = this.#todoListCount++;
    const todoList = this.#todoLists.addTodoList(new TodoList({ heading, id }));
    this.#saveTodos();
    return todoList;
  }

  deleteTodoList(listId) {
    this.#todoLists.deleteTodoList(listId);
    this.#saveTodos();
  }

  addTodo(listId, description) {
    const id = this.#todoCount++;
    const todo = this.#todoLists.addTodo(listId, new Todo({ id, description }));
    this.#saveTodos();
    return todo;
  }

  toggleTodoStatus(todoId, listId) {
    const todo = this.#todoLists.toggleTodoStatus(todoId, listId);
    this.#saveTodos();
    return todo;
  }

  deleteTodo(todoId, listId) {
    this.#todoLists.deleteTodo(todoId, listId);
    this.#saveTodos();
  }

  getAllTodos() {
    return this.#todoLists.getAllTodos();
  }

  getKeptTodos() {
    const allLists = this.getAllTodos();
    const keptLists = allLists.filter((list) => !list.deleted);
    const keptTodos = keptLists.map((list) => {
      const todos = list.todos.filter((todo) => !todo.deleted);
      return { ...list, todos };
    });

    return keptTodos;
  }
}

const getTodoListsController = ({ todoPath, logger, io }) => {
  const todoLists = new TodoLists();
  const todoStorage = new TodoRepository(todoPath, io, logger);
  const todoListsController = new TodoListsController(todoLists, todoStorage);
  todoListsController.restoreAllTodos();
  return todoListsController;
};

module.exports = { getTodoListsController, TodoListsController };
