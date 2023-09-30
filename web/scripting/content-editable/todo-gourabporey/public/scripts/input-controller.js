class MouseController {
  #addBtn;
  #inputBox;

  constructor(inputBox, addBtn) {
    this.#inputBox = inputBox;
    this.#addBtn = addBtn;
  }

  #hasNoContent(todoText) {
    return todoText === null || todoText === '';
  }

  #clearInputBox() {
    this.#inputBox.value = '';
    this.#inputBox.focus();
  }

  onAddBtnClick(sendData) {
    this.#addBtn.onclick = () => {
      const text = this.#inputBox.value;
      if (this.#hasNoContent(text)) return;
      this.#clearInputBox();
      sendData(text);
    };
  }

  start() {
    this.#inputBox.focus();
  }
}
