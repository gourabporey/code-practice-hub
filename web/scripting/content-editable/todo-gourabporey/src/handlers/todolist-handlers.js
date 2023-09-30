const serveTodoLists = (req, res) => {
  res.json(req.app.todoListsController.getKeptTodos());
};

const addTodoList = (req, res) => {
  const { todoListTitle } = req.body;
  const todoList = req.app.todoListsController.addTodoList(todoListTitle);
  res.status(201).json(todoList);
};

const deleteTodoList = (req, res) => {
  const listId = +req.params.listId;
  req.app.todoListsController.deleteTodoList(listId);
  res.status(204).end();
};

const addTodo = (req, res) => {
  const listId = +req.params.listId;
  const { todoDescription } = req.body;
  const todo = req.app.todoListsController.addTodo(listId, todoDescription);
  res.status(201).json(todo);
};

const deleteTodo = (req, res) => {
  const todoId = +req.params.todoId;
  const listId = +req.params.listId;
  req.app.todoListsController.deleteTodo(todoId, listId);
  res.status(204).end();
};

const toggleTodoStatus = (req, res) => {
  const todoId = +req.params.todoId;
  const listId = +req.params.listId;
  const todo = req.app.todoListsController.toggleTodoStatus(todoId, listId);
  res.status(200).json(todo);
};

module.exports = {
  serveTodoLists,
  addTodoList,
  deleteTodoList,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
};
