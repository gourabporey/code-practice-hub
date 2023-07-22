const getInputBox = () => document.querySelector('#comment');

window.onload = () => {
  const inputBox = getInputBox();

  inputBox.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      console.log(inputBox.value);
      inputBox.value = '';
    }
  });
};
