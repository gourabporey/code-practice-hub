const fs = require("fs");

const generateNumbers = function (length) {
  return Array.from({ length }, () => Math.round(Math.random() * 100000));
}

fs.writeFileSync("./random-numbers.txt", generateNumbers(1000000).join("\n"))