const getInputBox = () => document.querySelector('#comment');

const getInputOnEnter = (inputBox, getTextOfInputBox) => {
  inputBox.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      getTextOfInputBox(inputBox.value);
      inputBox.value = '';
    }
  });
};

const getInputOnChange = (textArea, getText) => {
  textArea.onchange = getText;
};

const getOptionValue = (selectionGroup, getSelected) => {
  selectionGroup.onchange = () => {
    getSelected(selectionGroup.value);
  };
};

const printText = (text) => {
  console.log(text);
};

window.onload = () => {
  const inputBox = getInputBox();
  getInputOnEnter(inputBox, printText);

  const textArea = document.querySelector('#comment-area');
  getInputOnEnter(textArea, printText);
  getInputOnChange(textArea, printText);

  const countrySelection = document.querySelector('#select-country');
  getOptionValue(countrySelection, printText);
};
