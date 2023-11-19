const {
  sumOf,
  descending,
  toNumber,
  readFileSync,
  sort,
} = require('../utils/math');

const calculateMostCalories = (calorieInfo, numOfElves = 1) => {
  const calorieCountsOfAllElves = calorieInfo.map(sumOf);
  const sortedCalorieCounts = sort(calorieCountsOfAllElves, descending);
  return sortedCalorieCounts.slice(0, numOfElves);
};

const parseCalorieInfo = (rawCalorieInfo) => {
  return rawCalorieInfo
    .split('\n\n')
    .map((rawCalorieInfoOfEachElf) =>
      rawCalorieInfoOfEachElf.split('\n').map(toNumber)
    );
};

const day1CalorieCounting = () => {
  const rawData = readFileSync('./data/day1.txt');
  const calorieInfo = parseCalorieInfo(rawData);
  const maxCalories = calculateMostCalories(calorieInfo);
  const maxCaloriesOfThreeElves = calculateMostCalories(calorieInfo, 3);

  console.log(sumOf(maxCalories), sumOf(maxCaloriesOfThreeElves));
};

module.exports = { day1CalorieCounting };
