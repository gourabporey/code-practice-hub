const { printAt, makeCoursorInvisible, magentaStar, greenStar } = require("../lib/style-utils");
const { yinYang } = require('./yin-yang.js');
const { floodfill } = require("./floodfill");

const render = (color, points, delay) => {
  const [currentPoint, ...rest] = points;

  const [x, y] = currentPoint;

  if (rest.length === 0) return;

  printAt(color, x, y);

  setTimeout(() => render(color, rest, delay), delay);
};

const upperCircle = floodfill(10, 14, yinYang(16), []);
const lowerCircle = floodfill(22, 14, yinYang(16), []);

const rightSpiral1 = floodfill(5, 10, yinYang(16), []);
const rightSpiral2 = floodfill(16, 25, yinYang(16), []);

const leftSpiral1 = floodfill(22, 10, yinYang(16), []);
const leftSpiral2 = floodfill(12, 6, yinYang(16), []);

console.clear();
makeCoursorInvisible();
process.stdin.read();

render(greenStar, lowerCircle, 400);
render(greenStar, rightSpiral1, 50);
render(greenStar, rightSpiral2, 50);

render(magentaStar, upperCircle, 200);
render(magentaStar, leftSpiral1, 50);
render(magentaStar, leftSpiral2, 50);