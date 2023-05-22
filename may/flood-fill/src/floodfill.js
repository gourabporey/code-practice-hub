const floodfill = (row, col, list, pointsInside, color) => {
  if (list[row][col] !== 0) return pointsInside;
  if (list[row][col] == "c") return pointsInside;

  list[row][col] = "c";
  pointsInside.push([row, col]);

  floodfill(row + 1, col, list, pointsInside, color);
  floodfill(row - 1, col, list, pointsInside, color);
  floodfill(row, col + 1, list, pointsInside, color);
  floodfill(row, col - 1, list, pointsInside, color);

  return pointsInside;
};

const floodfillUsingObject = (point, boundary, pointsInside) => {
  const [row, col] = point;
  if (boundary[row].includes(col)) return pointsInside;

  pointsInside[row] = pointsInside[row] || [];
  if (pointsInside[row].includes(col)) return pointsInside;

  pointsInside[row] = pointsInside[row].concat(col);

  const a = floodfillUsingObject(row + 1, col, boundary, pointsInside);
  const b = floodfillUsingObject(row - 1, col, boundary, pointsInside);
  const c = floodfillUsingObject(row, col + 1, boundary, pointsInside);
  const d = floodfillUsingObject(row, col - 1, boundary, pointsInside);

  return { ...a, ...b, ...c, ...d };
};

exports.floodfill = floodfill;