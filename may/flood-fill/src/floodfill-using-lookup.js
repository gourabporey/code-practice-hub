const floodfillUsingObject = (point, boundary, pointsInside) => {
  const [row, col] = point;
  if (boundary[row].includes(col)) return pointsInside;

  pointsInside[row] = pointsInside[row] || [];
  if (pointsInside[row].includes(col)) return pointsInside;

  pointsInside[row].push(col);

  floodfillUsingObject([row + 1, col], boundary, pointsInside);
  floodfillUsingObject([row - 1, col], boundary, pointsInside);
  floodfillUsingObject([row, col + 1], boundary, pointsInside);
  floodfillUsingObject([row, col - 1], boundary, pointsInside);

  return pointsInside;
};

const getBoundedPoints = list => {
  const [pointInside, ...boundary] = list;

  const boundaryPoints = boundary.reduce((points, point) => {
    const [row, col] = point;
    points[row] = points[row] || [];
    return { ...points, [row]: points[row].concat(col) };
  }, {});

  if (Object.keys(boundaryPoints).length < 3) return [];

  const pointsInsideLookup = floodfillUsingObject(pointInside, boundaryPoints, {});

  const pointsInside = [];

  for (row in pointsInsideLookup) {
    const cols = pointsInsideLookup[row];

    for (const col of cols) {
      pointsInside.push([+row, col]);
    };
  };

  return pointsInside;
};

exports.floodfillUsingObject = floodfillUsingObject;
exports.getBoundedPoints = getBoundedPoints;
