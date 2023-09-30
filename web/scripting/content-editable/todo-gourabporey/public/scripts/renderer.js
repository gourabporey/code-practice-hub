const generateElement = ([tagName, attributes, children = '']) => {
  const element = document.createElement(tagName);

  Object.entries(attributes).forEach(([attribute, value]) => {
    if (attribute === 'classes') {
      element.classList.add(...value.split(/\s+/));
      return;
    }

    element.setAttribute(attribute, value);
  });

  if (Array.isArray(children)) element.append(...children.map(generateElement));
  else element.innerText = children;

  return element;
};

class TodoRenderer {
  #todoContainer;
  #addTodoInList;
  #toggleTodoStatus;
  #deleteTodoOfId;
  #deleteListOfId;
  #onSortBtnClick;

  constructor(todoContainer) {
    this.#todoContainer = todoContainer;
  }

  onToggleMark(toggleElementOfId) {
    this.#toggleTodoStatus = toggleElementOfId;
  }

  onSortBtnClick(sortListByType) {
    this.#onSortBtnClick = sortListByType;
  }

  onAddBtnClick(addTodo) {
    this.#addTodoInList = addTodo;
  }

  onDeleteBtnClick(deleteTodoOfId) {
    this.#deleteTodoOfId = deleteTodoOfId;
  }

  onDeleteListClick(deleteListOfId) {
    this.#deleteListOfId = deleteListOfId;
  }

  #createTodoComponents(listId, todoId, todoDescription) {
    const checkBoxAttributes = { type: 'checkbox', classes: 'todo-checkbox' };
    const todoCheckBox = ['input', checkBoxAttributes];
    const todoDesc = [
      'div',
      { classes: 'todo-description', contenteditable: true },
      todoDescription,
    ];
    const todoDelete = ['div', { classes: 'todo-delete-btn' }];

    const [checkBox, todoDescElement, todoDeleteBtn] = [
      todoCheckBox,
      todoDesc,
      todoDelete,
    ].map(generateElement);

    todoDeleteBtn.innerHTML = '&#xD7;';
    checkBox.onclick = () => this.#toggleTodoStatus(todoId, listId);
    todoDescElement.onclick = () => this.#toggleTodoStatus(todoId, listId);
    todoDeleteBtn.onclick = () => this.#deleteTodoOfId(todoId, listId);

    return { checkBox, todoDescElement, todoDeleteBtn };
  }

  #createTodoElement(listId, { id, description, marked }) {
    const { checkBox, todoDescElement, todoDeleteBtn } =
      this.#createTodoComponents(listId, id, description);

    const todo = generateElement(['div', { classes: 'todo' }]);
    todo.append(checkBox, todoDescElement, todoDeleteBtn);

    if (marked) todo.classList.add('marked');
    else todo.classList.remove('marked');

    return todo;
  }

  #createSortRadioBtn(sortType, listId, selectedSort) {
    const btnId = `${listId}-${sortType}-sort`;

    const radioInput = generateElement([
      'input',
      { name: 'sort', type: 'radio', id: btnId },
    ]);
    radioInput.onclick = () => this.#onSortBtnClick(sortType, listId);

    const radioBtnLabel = generateElement(['label', {}]);
    radioBtnLabel.setAttribute('for', btnId);
    radioBtnLabel.innerText = sortType;

    const sortBtnDiv = generateElement(['div', { classes: 'sort-type' }]);

    if (sortType === selectedSort) sortBtnDiv.classList.add('selected-sort');

    sortBtnDiv.append(radioInput, radioBtnLabel);

    return sortBtnDiv;
  }

  #createSortSection(listId, selectedSort) {
    const sortSection = generateElement([
      'section',
      { classes: 'sort-section' },
      [['span', {}, 'Sort by:']],
    ]);

    const sortTypes = ['group', 'time', 'name'];
    const [groupSortRadioBtn, timeSortRadioBtn, nameSortRadioBtn] =
      sortTypes.map((sortType) =>
        this.#createSortRadioBtn(sortType, listId, selectedSort)
      );

    sortSection.append(groupSortRadioBtn, timeSortRadioBtn, nameSortRadioBtn);

    return sortSection;
  }

  #createListHeader(listId, heading, selectedSortType) {
    const headerElement = generateElement([
      'header',
      { classes: 'todo-category-header' },
      [],
    ]);

    const listHeading = generateElement([
      'h2',
      { contenteditable: true },
      heading,
    ]);

    listHeading.onclick = () => {
      window.history.pushState({}, '', `/todolists/${listId}/edit`);
    };

    window.onkeydown = (e) => {
      if (e.keyCode === 13) {
        fetch(`/todolists/${listId}/edit`, {
          method: 'PATCH',
          body: { listHeading: listHeading.value },
          headers: { 'content-type': 'application/json' },
        });
      }
    };

    const sortSection = this.#createSortSection(listId, selectedSortType);

    headerElement.append(listHeading, sortSection);

    return headerElement;
  }

  #createTodoAddSection(listId) {
    const todoAddSection = generateElement([
      'section',
      { id: 'todo-add-section' },
      [
        ['input', { placeholder: 'Enter your todo', type: 'text' }],
        ['input', { classes: 'todo-add-btn', type: 'button', value: '+' }],
      ],
    ]);

    todoAddSection.querySelector('.todo-add-btn').onclick = () => {
      const todoInputBox = todoAddSection.querySelector('input[type=text]');
      this.#addTodoInList(listId, todoInputBox.value);
      todoInputBox.value = '';
      todoInputBox.focus();
    };

    return todoAddSection;
  }

  #createListDeleteBtn(listId) {
    const deleteBtn = generateElement(['div', { classes: 'list-delete-btn' }]);
    deleteBtn.innerHTML = '&#xD7;';
    deleteBtn.onclick = () => this.#deleteListOfId(listId);

    return deleteBtn;
  }

  #createTodoList({ id, heading, todos, sort }) {
    const todoListAttributes = {
      id,
      classes: 'todo-category',
    };
    const todoListElement = generateElement(['article', todoListAttributes]);
    const todoListDeleteBtn = this.#createListDeleteBtn(id);
    const todoListHeader = this.#createListHeader(id, heading, sort);
    const todoAddSection = this.#createTodoAddSection(id);
    const todoContainer = document.createElement('section');
    const todoElements = todos.map((todo) => this.#createTodoElement(id, todo));

    todoContainer.append(...todoElements);
    todoListElement.append(
      todoListDeleteBtn,
      todoListHeader,
      todoAddSection,
      todoContainer
    );

    return todoListElement;
  }

  #emptyTodoContainer() {
    this.#todoContainer.innerHTML = '';
  }

  render(todoLists) {
    this.#emptyTodoContainer();

    const toTodoListElement = (todoList) => this.#createTodoList(todoList);
    const todoListElements = todoLists.map(toTodoListElement);

    this.#todoContainer.append(...todoListElements);
  }
}
