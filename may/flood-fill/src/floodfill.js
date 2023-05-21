const pointsInside = (p1, p2) => {
  if (p1[0] !== p2[0]) return [];

  const points = [];

  for (let lowerBound = p1[1] + 1; lowerBound < p2[1]; lowerBound++) {
    const newPoint = [p1[0], lowerBound];
    points.push(newPoint);
  };

  return points;
};

exports.pointsInside = pointsInside;