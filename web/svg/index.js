const SVG_ELEMENTS = ['svg', 'rect', 'g'];

const generateElement = ([tagName, attributes, children]) => {
  let element;

  if (SVG_ELEMENTS.includes(tagName)) {
    element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  } else {
    element = document.createElement(tagName);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  if (typeof children === 'string') element.innerText = children;
  else if (Array.isArray(children))
    element.append(...children.map(generateElement));
  else element.append(children);

  return element;
};

const generateSvgBoard = ({
  rowTileCount,
  columnTileCount,
  tileDimensions,
}) => {
  const { width, height } = tileDimensions;
  const rectangles = [];

  for (let cx = 0; cx < rowTileCount; cx++) {
    for (let cy = 0; cy < columnTileCount; cy++) {
      rectangles.push([
        'rect',
        {
          x: cx * width,
          y: cy * height,
          width,
          height,
          style: 'fill:#e6ccb2;stroke:black;stroke-width:1',
          id: `${cx},${cy}`,
        },
        '',
      ]);
    }
  }

  const svgBoard = generateElement([
    'svg',
    { height: 1000, width: 1000 },
    rectangles,
  ]);

  return svgBoard;
};

window.onload = () => {
  const board = document.querySelector('.board');
  board.append(
    generateSvgBoard({
      rowTileCount: 24,
      columnTileCount: 25,
      tileDimensions: { height: 30, width: 30 },
    })
  );
};
