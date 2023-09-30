const getHeaders = (contentType) => {
  if (contentType === 'object') return { 'content-type': 'application/json' };
  return {};
};

class TodoApiService {
  getAllTodos(callback) {
    fetch('/todolists')
      .then((res) => res.json())
      .then((todos) => callback(todos));
  }

  #sendRequest({ url, content, onResponse, method }) {
    const headers = getHeaders(typeof content);

    fetch(url, {
      method,
      body: JSON.stringify(content),
      headers,
    }).then((res) => onResponse(res));
  }

  addTodoList(todoListInfo, onResponse) {
    this.#sendRequest({
      url: '/todolists',
      method: 'POST',
      content: todoListInfo,
      onResponse,
    });
  }

  deleteTodoList(listId, onResponse) {
    this.#sendRequest({
      url: `/todolists/${listId}`,
      method: 'DELETE',
      onResponse,
    });
  }

  addTodo({ listId, todoDescription }, onResponse) {
    this.#sendRequest({
      url: `/todolists/${listId}/todos`,
      method: 'POST',
      content: { todoDescription },
      onResponse,
    });
  }

  deleteTodo({ listId, todoId }, onResponse) {
    this.#sendRequest({
      url: `/todolists/${listId}/todos/${todoId}`,
      method: 'DELETE',
      onResponse,
    });
  }

  toggleTodo({ listId, todoId }, onResponse) {
    this.#sendRequest({
      url: `/todolists/${listId}/todos/${todoId}`,
      method: 'PATCH',
      onResponse,
    });
  }
}
