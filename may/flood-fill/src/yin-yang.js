const isOnPerimeter = (point, center, radius) => {
  const [dx, dy] = point.map((val, index) => val - center[index]);
  return Math.round(Math.hypot(dx, dy)) === radius;
};

const createEmptyCanvas = (size, filler) => {
  return Array.from({ length: size }, () => new Array(size).fill(filler));
};

const setPixel = function (row, col) {
  this[row][col] = 1;
};

const yinYang = radius => {
  const mediumRadius = radius / 2;
  const smallRadius = radius / 4;
  const diameter = radius * 2 + 1;
  const largeCenter = [radius, radius];
  const upperCenter = [radius / 2, radius];
  const lowerCenter = [radius * 1.5, radius];

  const canvas = createEmptyCanvas(diameter, 0);
  const setPixelOfCanvas = setPixel.bind(canvas);

  const processPoint = ([row, col]) => {
    const isPointOnPerimeterOf = isOnPerimeter.bind(null, [row, col]);

    const isOnLargeCirclePerimeter = isPointOnPerimeterOf(largeCenter, radius);

    const isOnSmallCirclePerimeter =
      isPointOnPerimeterOf(upperCenter, smallRadius) ||
      isPointOnPerimeterOf(lowerCenter, smallRadius);

    const isOnSpiral =
      col <= radius && isPointOnPerimeterOf(upperCenter, mediumRadius) ||
      col >= radius && isPointOnPerimeterOf(lowerCenter, mediumRadius);

    if (isOnLargeCirclePerimeter || isOnSmallCirclePerimeter || isOnSpiral) {
      setPixelOfCanvas(row, col);
    };
  };

  for (let row = 0; row < diameter; row++) {
    for (let col = 0; col < diameter; col++) {
      processPoint([row, col]);
    };
  };

  return canvas;
};

exports.yinYang = yinYang;