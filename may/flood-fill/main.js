const main = list => {
  const [pointInside, ...boundary] = list;

  const boundaryPoints = boundary.reduce((points, point) => {
    const row = point[0];
    const col = point[1];
    points[row] = points[row] || [];
    return { ...points, [row]: points[row].concat(col) };
  }, {});

  const pointsInsideLookup = floodfillUsingObject(pointInside, boundaryPoints, {});

  const pointsInside = [];

  for (row in pointsInsideLookup) {
    const cols = pointsInsideLookup[row];
    for (col of cols) {
      pointsInside.push([+row, col]);
    };
  };

  console.log(pointsInside);
};