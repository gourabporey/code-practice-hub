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

const generateSvgBoard = ({ rowTileCount, tileDimensions, totalTiles }) => {
  let currentRowNumber = 0;
  const columnTileCount = Math.round(totalTiles / rowTileCount);

  const { width, height } = tileDimensions;
  const rectangles = new Array(totalTiles).fill('').map((_, index) => {
    const x = (index % rowTileCount) * width;
    const y = (currentRowNumber % columnTileCount) * height;
    if ((index + 1) % rowTileCount === 0) currentRowNumber++;

    return [
      'rect',
      {
        x,
        y,
        width,
        height,
        style:
          'fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9',
      },
      '',
    ];
  });

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
      rowTileCount: 5,
      tileDimensions: { height: 50, width: 50 },
      totalTiles: 25,
    })
  );
};
