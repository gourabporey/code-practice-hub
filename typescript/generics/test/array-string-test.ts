import assert from 'node:assert';
import { reverse } from '../src/array-strings';
import { describe, it } from 'node:test';

describe('reverse', () => {
  it('should give the reversed elements', () => {
    const actual = reverse([1, 2, 3]);
    const expected = [3, 2, 1];
    assert.deepStrictEqual(actual, expected);
  });
});
