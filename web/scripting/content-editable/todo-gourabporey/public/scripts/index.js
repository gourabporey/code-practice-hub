const getTodoContainer = () => document.querySelector('#todo-container');
const getInputBox = () => document.querySelector('#input-todo-category');
const getAddBtn = () => document.querySelector('#add-todo-category');

const collectTodos = () => {
  const addBtn = getAddBtn();
  const inputBox = getInputBox();
  const inputController = new MouseController(inputBox, addBtn);

  const todoContainer = getTodoContainer();
  const renderer = new TodoRenderer(todoContainer);

  const todoSortService = new TodoSortService(localStorage);
  const todoApiService = new TodoApiService({ fetch });

  const todoController = new TodoController({
    renderer,
    inputController,
    todoSortService,
    todoApiService,
  });

  todoController.start();
};

window.onload = collectTodos;
