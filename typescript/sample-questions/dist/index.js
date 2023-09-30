"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addNumbers = (a, b) => a + b;
// Write a function which gives sum of first n natural number. fn(6) => 21.
const sumOfN = (n) => (n * (n + 1)) / 2;
// Write a function that check given string is palindrom.
const isPalindrome = (text) => {
    const reversedText = [...text].reverse().join('');
    return text === reversedText;
};
// Write a function that take a string and pad length return the left padded string.
const leftPad = (text, padLength) => {
    const SPACE = ' ';
    return SPACE.repeat(padLength).concat(text);
};
const zip = (numbers1, numbers2) => {
    const numbers = [];
    numbers1.forEach((number, index) => numbers.push([number, numbers2[index]]));
    return numbers;
};
const square = (a) => Math.pow(a, 2);
const squareRoot = (a) => Math.sqrt(a);
const calculateDistance = (p1, p2) => {
    const horizontalDistance = p1.x - p2.x;
    const verticalDistance = p1.y - p2.y;
    return squareRoot(square(horizontalDistance) + square(verticalDistance));
};
const calculatePerimeter = (circle) => 2 * Math.PI * circle.radius;
const calculateArea = (circle) => Math.PI * square(circle.radius);
const isInsideCircle = (circle, point) => {
    const distanceFromCenter = calculateDistance(circle.center, point);
    return circle.radius >= distanceFromCenter;
};
const capitalize = (text) => {
    const firstCharInUppercase = text.charAt(0).toUpperCase();
    return firstCharInUppercase.concat(text.slice(1).toLowerCase());
};
const displayPersonDetails = (person) => {
    const { name, age, gender } = person;
    console.log('Name', name);
    console.log('Age', age);
    console.log('Gender', gender);
};
const filterEligibleVoters = (persons) => {
    return persons.filter((person) => person.age >= 18);
};
const logError = (actual, expected) => {
    console.log('Actual:', actual);
    console.log('Expected:', expected);
    console.log();
};
const strictEqual = (actual, expected) => {
    const isEqual = actual === expected;
    if (!isEqual)
        logError(actual, expected);
    return isEqual;
};
const deepStrictEqual = (actual, expected) => {
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    if (!isEqual)
        logError(actual, expected);
    return isEqual;
};
const test = (msg, fn) => {
    console.log('Title', msg);
    const resultMsg = fn() ? ': Passed' : ': Failed';
    console.log('Test', resultMsg, '\n');
};
const main = () => {
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
