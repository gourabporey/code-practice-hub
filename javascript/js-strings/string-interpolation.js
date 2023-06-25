const greet = function() {
  for(const name of arguments) {
    console.log(`${getPrefix()}, ${name}`);
  }
};

const getPrefix = function() {
  return "Good morning";
};

const max = function() {
  const numbers = Array.from(arguments);

  return numbers.reduce(function(a, b) {
    return a > b ? a : b;
  });
};

const average = function() {
  const numbers = Array.from(arguments);

  return numbers.reduce(function(avg, element, index) {
    return (avg * index + element) / (index + 1);
  });
};

const testingArrayFromObject = function() {
  console.log(arguments);
  console.log(Array.from({0: 1, 1: 4, 2: 5, length: 2}));
  console.log(Array.from({0: 1, 1: 4, 2: 5, length: null}));
  console.log(Array.from({0: 1, 1: 4, 2: 5, length: "2"}));
  console.log(Array.from({0: 1, 1: 4, 2: 5, length: [3]}));
  console.log(Array.from({0: 1, 1: 4, 2: 5, length: undefined}));
  console.log(Array.from({0: 1, 1: 4, 2: 5, length: "gourab"}));
  console.log(Array.from({0: 1, 1: 4, 2: 5, length: true}));
  console.log(Array.from({0: 1, 1: 4, 2: 5, length: {}}));
  console.log(Array.from({0: 1, 1: 4, 2: 5, length: {0: 1}}));
  console.log(Array.from({"0": 1, "1": 4, "2": 5, length: 3}));
  console.log(Array.from({true: 1, false: 4, "2": 5, length: 3}));
  // Error: console.log(Array.from({0: 1, 1: 4, 2: 5, length: {1}}));
};

testingArrayFromObject();
