const generateElement = ([tagName, attributes, children]) => {
  const element = document.createElement(tagName);

  Object.entries(attributes).forEach(([attrName, attrValue]) =>
    element.setAttribute(attrName, attrValue)
  );

  if (typeof children === 'string') element.innerText = children;
  if (Array.isArray(children)) element.append(...children.map(generateElement));

  return element;
};

const generateCluedoBoard = (rooms, corridors) => {
  const board = generateElement(['svg', { height: 400, width: 600 }, '']);
};
