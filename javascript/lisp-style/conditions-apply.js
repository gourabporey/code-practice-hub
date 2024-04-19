const deepEqual = (a, b) => {
  if (a === b) return true;

  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => keysB.includes(key) && deepEqual(a[key], b[key]));
};

const matchOccuranceWithSequence = (seqToMatch, collection) => {
  const filteredCollection = collection.filter((el1) =>
    seqToMatch.some((el2) => deepEqual(el1, el2))
  );
  return deepEqual(seqToMatch, filteredCollection);
};

const conditionsApply = (collection, matchers, defaultValue = "tuntun") => {
  const matchingElem = matchers.find(({ sequence }) =>
    matchOccuranceWithSequence(sequence, collection)
  );

  return matchingElem ? matchingElem.returnValue : defaultValue;
};

const main = () => {
  const matchers = [
    { sequence: [1, 3], returnValue: "wonder-woman" },
    { sequence: ["a", "b", "c"], returnValue: "durga" },
    {
      sequence: [
        [2, 3],
        [4, 5],
      ],
      returnValue: "cleopatra",
    },
  ];

  console.assert(conditionsApply([1, 3], matchers) === "wonder-woman");
  console.assert(conditionsApply([1, 2, 3], matchers) === "wonder-woman");
  console.assert(conditionsApply([1, 0, 2, 3], matchers) === "wonder-woman");
  console.assert(conditionsApply([0, 1, 2, 3], matchers) === "wonder-woman");

  console.assert(conditionsApply([[2, 3], [4, 5]], matchers) === "cleopatra");
  console.assert(conditionsApply([[2, 3], [3, 4], [4, 5]], matchers) === "cleopatra");
  
  console.assert(conditionsApply([[4, 5], [2, 3], [4, 5]], matchers) === "tuntun");
};

main();
