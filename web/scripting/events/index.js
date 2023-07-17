const promptAndUpdate = (element) => {
  const msg = prompt('Enter data to insert in div');
  element.innerText += msg + '\n';
};

const changeColor = (element) => {
  element.className = element.className === 'red' ? 'green' : 'red';
};

const updateMainDiv = () => {
  const mainDiv = document.querySelector('div#main-div');
  mainDiv.onmouseenter = (event) => changeColor(event.target);
  mainDiv.onmouseleave = (event) => changeColor(event.target);
  mainDiv.onclick = (event) => promptAndUpdate(event.target);
};

window.onload = updateMainDiv;
