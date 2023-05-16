add = function(x=1, y) {
  return x + y;
};

gourab = {
  name: "gourab",
  age: 20
};

const concat = function(number, suffix) {
  return number + suffix;
};

const addNum = function(type, number, other) {
  return type(other.value() + number);
};

const identity = function(number) {
  return number;
};

const realNumber = function(number) {
  const value = identity.bind(null, number);
  const toString = concat.bind(null, number, "");
  const add = addNum.bind(null, realNumber, number);

  return {toString, add, value};
};

const imaginaryNumber = function(number) {
  const value = identity.bind(null, number);
  const toString = concat.bind(null, number, "i");
  const add = addNum.bind(null, imaginaryNumber, number);

  return {toString, add, value};
};
