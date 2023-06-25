const fs = require("fs");

const calculateWpm = (charactersTyped, timeInSeconds) => {
  const characterCount = charactersTyped.length;
  const cpm = (characterCount / (timeInSeconds / 60));
  return Math.floor(cpm / 5);
}

const typeRacer = function () {
  let timeTraversed = 0;

  setInterval(() => {
    timeTraversed += 1;
    const content = fs.readFileSync("./demo", "utf8");
    const wpm = calculateWpm(content, timeTraversed);
    console.clear();
    console.log(`${wpm} wpm`);
  }, 1000);
}

typeRacer();