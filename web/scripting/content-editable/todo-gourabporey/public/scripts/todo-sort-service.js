class TodoSortService {
  #storageApi;

  constructor(storageApi) {
    this.#storageApi = storageApi;
  }

  setSortType(listId, sortType) {
    this.#storageApi.setItem(listId, sortType);
  }

  dictionarySortTodos(todos) {
    return todos.toSorted((a, b) => (a.description > b.description ? 1 : -1));
  }

  groupSortTodos(todos) {
    const marked = todos.filter((todo) => todo.marked);
    const unmarked = todos.filter((todo) => !todo.marked);
    return [...unmarked, ...marked];
  }

  sort(todos) {
    const getSortFn = (type) => {
      const sortFunctions = {
        group: (todos) => this.groupSortTodos(todos),
        name: (todos) => this.dictionarySortTodos(todos),
        time: (todos) => todos,
      };

      return sortFunctions[type];
    };

    const sortedTodos = todos.map((todoList) => {
      const sort = this.#storageApi.getItem(todoList.id) || 'time';
      const sortFn = getSortFn(sort);
      return { ...todoList, todos: sortFn(todoList.todos), sort };
    });

    return sortedTodos;
  }
}
