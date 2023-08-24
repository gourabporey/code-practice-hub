const generateElement = ([tagName, attributes, children]) => {
  const element = document.createElement(tagName);

  const { classes = [], id } = attributes;
  element.classList.add(...classes);
  if (id) element.id = id;

  if (typeof children === 'string') element.innerText = children;
  if (Array.isArray(children)) element.append(...children.map(generateElement));

  return element;
};

const generateElementText = ([tagName, attributes, children]) => {
  const attributesText = Object.entries(attributes)
    .map(([attr, val]) => ` ${attr}='${val}'`)
    .join(' ');

  const openingTag = `<${tagName}${attributesText}>`;
  const closingTag = `<${tagName}>`;

  if (Array.isArray(children)) {
    const childrenHtml = children.map(generateElementText).join('\n');
    const element = `${openingTag}\n${childrenHtml}\n${closingTag}`;
    return element;
  }

  return `${openingTag}\n${children || ''}\n${closingTag}`;
};
