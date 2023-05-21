const { chunk } = require("../lib/array-utils.js");

const pointsInside = ([p1, p2]) => {
  if (p1[0] !== p2[0]) return [];

  const points = [];

  for (let lowerBound = p1[1] + 1; lowerBound < p2[1]; lowerBound++) {
    const newPoint = [p1[0], lowerBound];
    points.push(newPoint);
  };

  return points;
};

const floodfill = points => {
  let pointsPairs = chunk(points, 2, 1);
  if (pointsPairs[pointsPairs.length - 1].length === 1) pointsPairs.pop();

  return pointsPairs.flatMap(pointsInside);
};

exports.pointsInside = pointsInside;
exports.floodfill = floodfill; 