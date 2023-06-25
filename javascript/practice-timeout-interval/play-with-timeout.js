// let count = 0;
// const intervals = [];

// while (count < 5) {
//   intervals.push(setInterval(() => console.log(count), 1000));
//   count++;
// }

// setTimeout(() => {
//   intervals.forEach((interval) => clearInterval(interval));
//   //setInterval(() => console.log("Another line"), 100);
// }, 1000);

// // setTimeout((name, age) => {
// //   console.log(name, age);
// // }, 1000, "Gourab", 22);

const spin = function () {
  const spinner = "/-\\";
  let index = 0;

  setInterval(() => {
    console.clear();
    console.log(spinner[index]);
    index = (index + 1) % spinner.length;
  }, 200);
}

let nameIndex = 0;

const greet = function () {
  console.log(`hello ${arguments[nameIndex]}`);
  nameIndex = (nameIndex + 1) % arguments.length;
}

const mySetInterval = (func, delay, ...args) => {
  setTimeout(() => {
    func(...args);
    mySetInterval(func, delay, ...args);
  }, delay);
}

mySetInterval(greet, 1000, "gourab", "qasim", "rishabh", "riya");