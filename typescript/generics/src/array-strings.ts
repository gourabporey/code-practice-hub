interface Reversible<T> {
  reverse: () => T;
}

const reverse = <T extends Reversible<T>>(elements: T): T => {
  return elements.reverse();
};

interface Concatable<T> {
  concat: (t: T) => T;
}

const concat = <T extends Concatable<T>>(a: T, b: T): T => {
  return a.concat(b);
};

const identity = <T>(element: T): T => element;

export { reverse, concat, identity };
