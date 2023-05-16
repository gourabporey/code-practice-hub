const assert = require("assert");
const println = console.log;

const isEven = function(num) {
  return num % 2 === 0;
};

assert.equal(isEven(20), 1, "20 is an even number");
assert.equal(isEven(20), true, "20 is an even number");

assert.strictEqual(isEven(20), true, "20 is an even number");

const biswa = {
  age: "22",
  association: "samosa",
  name: "Biswajit"
};

const sauma = {
  age: "22",
  association: "samosa",
  name: "Sauma"
};

const milan = {
  age: "22",
  association: "rajKachori",
  name: "milan"
};

const step9 = [sauma, biswa, milan];

const groupBy = function(criteria, list) {
  return list.reduce(function(group, element) {
    if(group[element[criteria]] === undefined) {
      group[element[criteria]] = [];
    }
    group[element[criteria]].push(element);
    return group;
  }, {});
};

const isOdd = function(number) {
  return !isEven(number);
};

const separate = function(list, ...criterias) {
  return criterias.reduce(function(group, criteria) {
    return group.concat([list.filter(criteria)]);
  }, []);
};

console.log(groupBy("association", step9));

console.log(separate([1, 2, 3, 4, 5, 6], isEven, isOdd));
/*
  //assert.equal(biswa, sauma);
assert.deepStrictEqual(biswa, sauma);
assert.deepEqual(biswa, biswa, "Both are same persons");
println("Test Passed!!");
 */
