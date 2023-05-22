const { paintGrid, printAt, blueBox, yellowBox, magentaBox, cyanBox, blackBox, greenBox } = require("../lib/style-utils");
const { yinYang } = require('./yin-yang.js');
const { floodfill } = require("./floodfill");

const render = (color, points, delay) => {
  const [currentPoint, ...rest] = points;

  const [x, y] = currentPoint;

  if (rest.length === 0) return;

  printAt(color, x, y);

  setTimeout(() => render(color, rest, delay), delay);
};

const upperCircle = floodfill(10, 14, yinYang(16), []).sort((a, b) => a[0] - b[0]);
const lowerCircle = floodfill(22, 14, yinYang(16), []).sort((a, b) => a[0] - b[0]);
const leftSpiral = floodfill(5, 10, yinYang(16), []).sort((a, b) => a[0] - b[0]);
const rightSpiral = floodfill(22, 10, yinYang(16), []).sort((a, b) => a[0] - b[0]);

console.clear();
process.stdin.read();
paintGrid(35, 35, yellowBox);

render(magentaBox, upperCircle, 200);
render(cyanBox, lowerCircle, 400);
render(greenBox, leftSpiral, 50);
render(blueBox, rightSpiral, 50);