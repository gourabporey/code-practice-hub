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
const rightSpiral2 = floodfill(16, 28, yinYang(16), []);

const leftSpiral1 = floodfill(22, 22, yinYang(16), []);
const leftSpiral2 = floodfill(12, 6, yinYang(16), []);

console.clear();
makeCoursorInvisible();
process.stdin.read();

render(magentaStar, lowerCircle, 400);
render(magentaStar, rightSpiral1, 50);
render(magentaStar, rightSpiral2, 50);

render(greenStar, upperCircle, 200);
render(greenStar, leftSpiral1, 50);
render(greenStar, leftSpiral2, 50);