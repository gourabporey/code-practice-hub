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

const consoleOnClick = () => {
  const child1 = document.querySelector('#child1');
  child1.onclick = (event) => {
    console.log(`Child 1 : ${event.target.id}`);
    event.secretMsg = 'This is a secret message';
  };

  child1.addEventListener('click', (event) => {
    console.log(`Child 1 : ${event.target.id}`);
    console.log(event.secretMsg);
  });

  const child2 = document.querySelector('#child2');
  child2.onclick = (event) => {
    console.log(`Child 2 : ${event.target.id}`);
  };

  const child3 = document.querySelector('#child3');
  child3.onclick = (event) => console.log(`Child 3 : ${event.target.id}`);

  const father = document.querySelector('#father');
  father.onclick = (event) => {
    console.log(`Father : ${event.target.id}`);
    console.log(event.secretMsg);
  };
};

window.onload = () => {
  updateMainDiv();
  consoleOnClick();
};
