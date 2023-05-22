const esc = "\033";

const style = (text, code) => `${esc}[${code}m${text}${esc}[0m`;

const printAt = (text, line, column) => process.stdout.write(
  `${esc}[${line + 1};${column * 2 + 1}f${text}`
);

const makeCoursorInvisible = () => {
  process.stdout.write(esc + "[?25l");
};

const makeCursorVisible = () => {
  process.stdout.write(esc + "[?25h");
};

const paintGrid = (row, col, box) => {
  console.clear();
  console.log(`${box.repeat(col)}\n`.repeat(row));
  console.log();
};

const blackBox = style("  ", 40);
const blueBox = style("  ", 44);
const yellowBox = style("  ", 43);
const magentaBox = style("  ", 45);
const cyanBox = style("  ", 46);
const greenBox = style("  ", 42);

const blackStar = style("*", 30);
const blueStar = style("*", 34);
const yellowStar = style("*", 33);
const magentaStar = style("*", 35);
const cyanStar = style("*", 36);
const greenStar = style("*", 32);

exports.printAt = printAt;
exports.style = style;
exports.paintGrid = paintGrid;
exports.makeCoursorInvisible = makeCoursorInvisible;
exports.makeCursorVisible = makeCursorVisible;

exports.blackBox = blackBox;
exports.blueBox = blueBox;
exports.yellowBox = yellowBox;
exports.cyanBox = cyanBox;
exports.magentaBox = magentaBox;
exports.greenBox = greenBox;

exports.blackStar = blackStar;
exports.blueStar = blueStar;
exports.yellowStar = yellowStar;
exports.cyanStar = cyanStar;
exports.magentaStar = magentaStar;
exports.greenStar = greenStar;