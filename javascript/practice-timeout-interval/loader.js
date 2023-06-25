const fs = require("fs");

const tick = (interval, times, updateFn, finalFn) => {
  if (times === 0) {
    finalFn();
    return;
  }

  setTimeout(() => {
    updateFn();
    tick(interval, times - 1, updateFn, finalFn);
  }, interval);
}

class Spinner {
  #index;

  constructor() {
    this.#index = 0;
  }

  update() {
    this.#index += 1;
  }

  toString() {
    return "Loading" + ".".repeat(this.#index % 3 + 1);
  }
}

const s = new Spinner();

update = function () {
  console.clear();
  console.log(this.toString());
  this.update();
}

print = function () {
  console.clear();
  const content = fs.readFileSync(this.toString(), "utf-8");
  console.log(content);
}

const updateSpinner = update.bind(s);
const printFinalContent = print.bind("./dummy-text");

tick(
  200,
  20,
  updateSpinner,
  printFinalContent
);