const fs = require("fs");
const { getBoundedPoints } = require("./src/floodfill-using-lookup");

const main = () => {
  const source = process.argv[2];

  fs.readFile(source, "utf-8", (err, data) => {
    if (err) console.error(err.message);

    const list = JSON.parse(data);
    const boundedPoints = getBoundedPoints(list);
    console.log(boundedPoints);
  });
};

main();