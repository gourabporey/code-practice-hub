/*
const greet = function(text, format) {
  return format(text);
}

const goodMorning = function(name) {
  return "Good morning " + name;
} 
 */

const add = function(a, b) {
  return a + b;
}

const sub = function(a, b) {
  return a - b;
}

const calculator = {
  "add": add,
  "sub": sub,
};

calculator["add"](a, b);
