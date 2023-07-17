const promptAndUpdate = (element) => {
  const msg = prompt('Enter data to insert in div');
  element.innerText += msg + '\n';
};

const colorTextToRed = (element) => {
  element.classList.remove('green');
  element.classList.add('red');
};

const colorTextToGreen = (element) => {
  element.classList.remove('red');
  element.classList.add('green');
};

const updateMainDiv = () => {
  const mainDiv = document.querySelector('div#main-div');
  mainDiv.onmouseenter = (event) => colorTextToRed(event.target);
  mainDiv.onmouseleave = (event) => colorTextToGreen(event.target);
  mainDiv.onclick = (event) => promptAndUpdate(event.target);
};

window.onload = updateMainDiv;
