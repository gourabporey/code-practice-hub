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

const appendToOutput = (text) => {
  const outputSection = document.querySelector('#output');
  const para = document.createElement('p');
  para.innerText = text;
  outputSection.appendChild(para);
};

window.onload = () => {
  const inputBox = getInputBox();
  getInputOnEnter(inputBox, appendToOutput);

  const textArea = document.querySelector('#comment-area');
  getInputOnEnter(textArea, appendToOutput);
  getInputOnChange(textArea, appendToOutput);

  const countrySelection = document.querySelector('#select-country');
  getOptionValue(countrySelection, appendToOutput);
};
