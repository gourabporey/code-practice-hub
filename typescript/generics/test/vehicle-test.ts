import { deepStrictEqual } from 'node:assert';
import { describe, it } from 'node:test';
import { sortVehileBasedOnPrice } from '../src/vehicle';

describe('sortVehicleBasedOnPrice', () => {
  it('should ascending sort the vehicles based based on price', () => {
    const bike1 = {
      color: 'red',
      model: 'a-11',
      price: 200000,
      twoSeater: true,
    };

    const car1 = {
      color: 'white',
      model: 'B-22',
      price: 350000,
      doors: 4,
    };

    const car2 = {
      color: 'black',
      model: 'c-33',
      price: 4000000,
      doors: 6,
    };

    deepStrictEqual(sortVehileBasedOnPrice([bike1, car1, car2]), [
      bike1,
      car1,
      car2,
    ]);
  });
});
