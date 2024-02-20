const createIncrementButton = () => {
  let counter = 0;

  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.onclick = () => {
    counter++;
    button.textContent = `Clicked ${counter} times`;
  };

  button.render = () => {
    console.log('render clicked');
    counter = 0;
    button.textContent = 'Click me';
  };

  return button;
};

const createResetButton = (incrementBtn) => {
  const button = document.createElement('button');
  button.textContent = 'Reset';
  button.onclick = () => incrementBtn.render();

  return button;
};

class IncrementButton {
  constructor() {
    this.state = { counter: 0 };
  }

  render() {
    const button = document.createElement('button');
    button.textContent = 'Click me';

    button.onclick = () => {
      this.state.counter++;
      button.textContent = `Clicked ${this.state.counter} times`;
    };

    return button;
  }
}

const main = () => {
  const mainContainer = document.getElementById('main-container');
  const incrementBtn = new IncrementButton();
  const resetBtn = createResetButton(incrementBtn);
  mainContainer.appendChild(incrementBtn.render());
  mainContainer.appendChild(resetBtn);
};

window.onload = main;
