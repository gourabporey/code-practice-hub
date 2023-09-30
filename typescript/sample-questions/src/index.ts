const addNumbers = (a: number, b: number): number => a + b;

// Write a function which gives sum of first n natural number. fn(6) => 21.

const sumOfN = (n: number): number => (n * (n + 1)) / 2;

// Write a function that check given string is palindrom.

const isPalindrome = (text: string): boolean => {
  const reversedText = [...text].reverse().join('');
  return text === reversedText;
};

// Write a function that take a string and pad length return the left padded string.

const leftPad = (text: string, padLength: number): string => {
  const SPACE = ' ';
  return SPACE.repeat(padLength).concat(text);
};

// Write a function to zip two given array of numbers.

type NumberTuple = [number, number];

const zip = (numbers1: number[], numbers2: number[]): NumberTuple[] => {
  const numbers: NumberTuple[] = [];

  numbers1.forEach((number: number, index: number) =>
    numbers.push([number, numbers2[index]])
  );

  return numbers;
};

// Create a point type, write a function that take two points and return distance between them.

type Point = {
  x: number;
  y: number;
};

const square = (a: number): number => Math.pow(a, 2);
const squareRoot = (a: number): number => Math.sqrt(a);

const calculateDistance = (p1: Point, p2: Point): number => {
  const horizontalDistance = p1.x - p2.x;
  const verticalDistance = p1.y - p2.y;

  return squareRoot(square(horizontalDistance) + square(verticalDistance));
};

type Circle = {
  center: Point;
  radius: number;
};

const calculatePerimeter = (circle: Circle): number =>
  2 * Math.PI * circle.radius;

const calculateArea = (circle: Circle): number =>
  Math.PI * square(circle.radius);

const isInsideCircle = (circle: Circle, point: Point): boolean => {
  const distanceFromCenter = calculateDistance(circle.center, point);
  return circle.radius >= distanceFromCenter;
};

type Person = {
  name: string;
  age: number;
  gender: string;
};

const capitalize = (text: string): string => {
  const firstCharInUppercase = text.charAt(0).toUpperCase();
  return firstCharInUppercase.concat(text.slice(1).toLowerCase());
};

const displayPersonDetails = (person: Person): void => {
  const { name, age, gender } = person;
  console.log('Name', name);
  console.log('Age', age);
  console.log('Gender', gender);
};

const filterEligibleVoters = (persons: Person[]): Person[] => {
  return persons.filter((person: Person) => person.age >= 18);
};

const logError = (actual: any, expected: any): void => {
  console.log('Actual:', actual);
  console.log('Expected:', expected);
  console.log();
};

const strictEqual = (actual: any, expected: any): boolean => {
  const isEqual = actual === expected;
  if (!isEqual) logError(actual, expected);
  return isEqual;
};

const deepStrictEqual = (actual: any, expected: any): boolean => {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
  if (!isEqual) logError(actual, expected);
  return isEqual;
};

const test = (msg: string, fn: Function): void => {
  console.log('Title', msg);
  const resultMsg = fn() ? ': Passed' : ': Failed';
  console.log('Test', resultMsg, '\n');
};

const main = (): void => {
  test('Sum of first 6 numbers should be 21', () => {
    return strictEqual(sumOfN(6), 21);
  });

  test('It should give false for non palindrome numbers', () => {
    return strictEqual(isPalindrome('mon'), false);
  });

  test('It Should give true for palindome numbers', () => {
    return strictEqual(isPalindrome('mom'), true);
  });

  test('It Should white space padding as provided in the pad length', () => {
    return strictEqual(leftPad('gourab', 5), '     gourab');
  });

  test('It should zip two same sized arrays', () => {
    return deepStrictEqual(zip([1, 2], [2, 3]), [
      [1, 2],
      [2, 3],
    ]);
  });

  test('Calculate Distance should give the distance of two points', () => {
    const actualDistance = calculateDistance({ x: 3, y: 4 }, { x: 0, y: 0 });
    const expectedDistance = 5;
    return strictEqual(actualDistance, expectedDistance);
  });

  test('Calculate Perimeter should give the perimeter of a circle', () => {
    const circle = { radius: 10, center: { x: 0, y: 0 } };
    return strictEqual(calculatePerimeter(circle), 62.83185307179586);
  });

  test('Calculate area should give the area of a circle', () => {
    const circle = { radius: 10, center: { x: 0, y: 0 } };
    return strictEqual(calculateArea(circle), 314.1592653589793);
  });

  test('isInsideCircle should give true for point being inside the perimeter of a circle', () => {
    const point = { x: 2, y: 3 };
    const circle = { radius: 10, center: { x: 0, y: 0 } };
    return strictEqual(isInsideCircle(circle, point), true);
  });

  test('filterEligibleVoters should give the persons who are eligible to vote', () => {
    const gourab = { name: 'gourab', age: 22, gender: 'male' };
    const raj = { name: 'raj', age: 18, gender: 'male' };
    const sauma = { name: 'sauma', age: 23, gender: 'male' };
    const sourov = { name: 'sourov', age: 16, gender: 'male' };

    deepStrictEqual(filterEligibleVoters([gourab, raj, sauma, sourov]), [
      gourab,
      raj,
      sauma,
    ]);
  });
};

main();
