import assert from 'node:assert';
import { describe, it } from 'node:test';
import { add } from '../src/calculator';

describe('Calculator', () => {
  it('should add given numbers', () => {
    assert.strictEqual(add(1, 32), 33);
  });
});
