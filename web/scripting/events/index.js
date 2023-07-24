const promptAndUpdate = (element) => {
  const msg = prompt('Enter data to insert in div');
  element.innerText += `${msg}\n`;
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

const printEventData = (event, msg) => {
  console.log(`${msg}, ID: ${event.target.id}`);
};

const consoleOnClick = () => {
  const child1 = document.querySelector('#child1');
  child1.onclick = (event) => printEventData(event, 'Child 1');
  child1.addEventListener('click', (event) => printEventData(event, 'Child 1'));

  const child2 = document.querySelector('#child2');
  child2.onclick = (event) => printEventData(event, 'Child 2');

  const child3 = document.querySelector('#child3');
  child3.onclick = (event) => printEventData(event, 'Child 3');

  const Father = document.querySelector('#father');
  Father.onclick = (event) => printEventData(event, 'Father');

  const grandFather = document.querySelector('#grand-father');
  grandFather.onclick = (event) => printEventData(event, 'Grand Father');
};

window.onload = () => {
  updateMainDiv();
  consoleOnClick();
};
