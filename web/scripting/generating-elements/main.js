const generateElement = ([tagName, attributes, children]) => {
  const element = document.createElement(tagName);

  const { classes = [], id } = attributes;
  element.classList.add(...classes);
  if (id) element.id = id;

  if (typeof children === 'string') element.innerText = children;
  if (Array.isArray(children)) element.append(...children.map(generateElement));

  return element;
};
