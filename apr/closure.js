const adder = function(x) {
  return function(y) {
    return x + y;
  };
};

const fancy = function(f, g) {
  return function(...args) {
    return f(g(...args));
  };
};

const makeCounter = function() {
  let count = 0;

  return function() {
    const currentCount = count;
    count++;
    return currentCount;
  };
};

const cycler = function(args) {
  let index = 0;

  return function() {
    const currElement = args[index];
    index = (index + 1 ) % args.length;
    return currElement;
  };
};

const rotate = function(args) {
  let index = 0;

  return function() {
    const rotatedList = args.slice(index).concat(args.slice(0, index));
    index = (index + 1 ) % args.length;
    return rotatedList;
  };
};

const command = function() {
  const environment = {
    pwd: process.env.PWD,
    home: process.env.HOME
  };

  const pwd = function() {
    return environment.pwd;
  };

  const ls = function() {
    return fs.readdirSync(pwd());
  };

  const cd = function(path) {
    environment.pwd += `/${path}`;
    return;
  };

  return {showPwd: pwd, changeDirectory: cd, list: ls};
};

const makeJustifier = function(length) {
  const leftJustifier = function(text) {
    return (text + " ".repeat(length)).slice(0, length);
  };

  const rightJustifier = function(text) {
    return (" ".repeat(length) + text).slice(-length);
  };

  return {leftJustifier, rightJustifier};
};

