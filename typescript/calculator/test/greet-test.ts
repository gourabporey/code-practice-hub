import assert from 'node:assert';
import { describe, it } from 'node:test';
import { greet } from '../src/nested/greet';

describe('Greet', () => {
  it('should greet', () => {
    assert.strictEqual(greet('Biswa'), 'Hello, Biswa');
  });
});
