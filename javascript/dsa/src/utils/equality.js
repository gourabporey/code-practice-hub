import SinglyLinkedList from "../SinglyLinkedList.js";

export const isDeepStrictEqual = (a, b) => {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object") return a === b;

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.every((e, i) => isDeepStrictEqual(e, b[i]));
  }

  if (a instanceof SinglyLinkedList && b instanceof SinglyLinkedList) {
    return a.equals(b);
  }

  if (Object.entries(a).length !== Object.entries(b).length) return false;

  for (const key in a) {
    if (a[key] !== b[key]) return false;
  }

  return true;
};
