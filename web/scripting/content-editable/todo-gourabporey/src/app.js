const express = require('express');
const { logRequest } = require('./middlewares/logger');
const {
  serveTodoLists,
  addTodoList,
  deleteTodoList,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
} = require('./handlers/todolist-handlers');

const createApp = ({ todoListsController }) => {
  const app = express();
  app.todoListsController = todoListsController;

  app.use(logRequest);
  app.use(express.json());

  app.get('/todolists', serveTodoLists);
  app.post('/todolists', addTodoList);
  app.delete('/todolists/:listId', deleteTodoList);
  app.post('/todolists/:listId/todos', addTodo);
  app.delete('/todolists/:listId/todos/:todoId', deleteTodo);
  app.patch('/todolists/:listId/todos/:todoId', toggleTodoStatus);

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
