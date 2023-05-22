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

exports.printAt = printAt;
exports.style = style;
exports.paintGrid = paintGrid;
exports.blackBox = blackBox;
exports.blueBox = blueBox;
exports.yellowBox = yellowBox;
exports.cyanBox = cyanBox;
exports.magentaBox = magentaBox;
exports.greenBox = greenBox;
exports.makeCoursorInvisible = makeCoursorInvisible;
exports.makeCursorVisible = makeCursorVisible;