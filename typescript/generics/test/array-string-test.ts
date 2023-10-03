import assert from 'node:assert';
import { concat, identity, reverse } from '../src/array-strings';
import { describe, it } from 'node:test';

describe('reverse', () => {
  it('should give the reversed elements', () => {
    const actual = reverse([1, 2, 3]);
    const expected = [3, 2, 1];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('concat', () => {
  it('should concat one string with another', () => {
    const actual = concat<string>('gourab', 'porey');
    const expected = 'gourabporey';
    assert.deepStrictEqual(actual, expected);
  });
});

describe('identity', () => {
  it('should give the same element', () => {
    assert.strictEqual(identity(5), 5);
  });
});
