const isOnPerimeter = (point, center, radius) => {
  const [px, py] = point;
  const [cx, cy] = center;

  const dx = px - cx;
  const dy = py - cy;

  return Math.round(Math.sqrt((dx ** 2 + dy ** 2))) === radius;
};

const yinYang = radius => {
  const mediumRadius = radius / 2;
  const smallRadius = radius / 4;
  const largeDiameter = radius * 2 + 1;
  const largeCenter = [radius, radius];
  const upperCenter = [radius / 2, radius];
  const lowerCenter = [radius * 1.5, radius];

  const canvas = new Array(largeDiameter).fill(0).map(() => new Array(largeDiameter).fill(0));

  for (let row = 0; row < largeDiameter; row++) {
    for (let col = 0; col < largeDiameter; col++) {

      const isOnLargestCirclePerimeter = isOnPerimeter([row, col], largeCenter, radius);

      const isOnSmallestCirclePerimeter =
        isOnPerimeter([row, col], upperCenter, smallRadius) ||
        isOnPerimeter([row, col], lowerCenter, smallRadius);

      const isOnSpiral =
        col <= radius && isOnPerimeter([row, col], upperCenter, mediumRadius) ||
        col >= radius && isOnPerimeter([row, col], lowerCenter, mediumRadius);

      if (isOnLargestCirclePerimeter || isOnSmallestCirclePerimeter || isOnSpiral) {
        canvas[row][col] = 1;
      };
    };
  };

  return canvas;
};

exports.yinYang = yinYang;