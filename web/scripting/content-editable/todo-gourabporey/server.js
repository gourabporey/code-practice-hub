const fs = require('fs');

const { createApp } = require('./src/app.js');
const { getTodoListsController } = require('./src/todo-lists-controller.js');

const main = () => {
  const todoListsController = getTodoListsController({
    io: fs,
    todoPath: './data/todos.json',
    logger: console,
  });
  const app = createApp({ todoListsController });
  const PORT = 8080;
  app.listen(PORT, () => console.log('started listening on', PORT));
};

main();
