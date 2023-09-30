class TodoController {
  #renderer;
  #todoLists;
  #inputController;
  #todoSortService;
  #todoApiService;

  constructor({ inputController, renderer, todoSortService, todoApiService }) {
    this.#renderer = renderer;
    this.#todoApiService = todoApiService;
    this.#todoSortService = todoSortService;
    this.#inputController = inputController;
  }

  #getAndRenderTodos() {
    this.#todoApiService.getAllTodos((todos) => {
      this.#todoLists = todos;
      this.#renderAllTodos();
    });
  }

  #renderAllTodos() {
    const sortedTodos = this.#todoSortService.sort(this.#todoLists);
    this.#renderer.render(sortedTodos);
  }

  start() {
    const getAndRenderTodos = () => this.#getAndRenderTodos();

    this.#inputController.onAddBtnClick((todoListTitle) => {
      this.#todoApiService.addTodoList({ todoListTitle }, getAndRenderTodos);
    });

    this.#renderer.onDeleteListClick((listId) => {
      this.#todoApiService.deleteTodoList(listId, getAndRenderTodos);
    });

    this.#renderer.onDeleteBtnClick((todoId, listId) => {
      this.#todoApiService.deleteTodo({ todoId, listId }, getAndRenderTodos);
    });

    this.#renderer.onAddBtnClick((listId, todoDescription) => {
      this.#todoApiService.addTodo(
        { listId, todoDescription },
        getAndRenderTodos
      );
    });

    this.#renderer.onToggleMark((todoId, listId) => {
      this.#todoApiService.toggleTodo({ todoId, listId }, getAndRenderTodos);
    });

    this.#renderer.onSortBtnClick((sortType, categoryId) => {
      this.#todoSortService.setSortType(categoryId, sortType);
      this.#renderAllTodos();
    });

    this.#inputController.start();

    this.#getAndRenderTodos();
  }
}
