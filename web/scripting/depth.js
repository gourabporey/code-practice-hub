const depth = (element) => {
  if (!element.hasChildNodes()) return 0;
  return 1 + Math.max(...Array.from(element.childNodes).map(depth));
}