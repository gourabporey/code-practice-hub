const floodfill = (row, col, list, pointsInside) => {
  if (list[row][col] !== 0) return pointsInside;
  if (list[row][col] == "c") return pointsInside;

  list[row][col] = "c";
  pointsInside.push([row, col]);

  floodfill(row + 1, col, list, pointsInside);
  floodfill(row - 1, col, list, pointsInside);
  floodfill(row, col + 1, list, pointsInside);
  floodfill(row, col - 1, list, pointsInside);

  return pointsInside;
};

exports.floodfill = floodfill;