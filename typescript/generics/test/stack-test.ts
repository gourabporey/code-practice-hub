import { describe, it } from 'node:test';
import Stack from '../src/stack';
import assert from 'node:assert';

const createStack = <T>(...elements: T[]): Stack<T> => {
  const stack = new Stack<T>();
  elements.forEach((elem: T) => stack.push(elem));

  return stack;
};

describe('Stack', () => {
  describe('push', () => {
    it('should push an element to the stack', () => {
      const strStack = createStack<string>('gourab', 'sourov');
      assert.deepStrictEqual(strStack.toArray(), ['gourab', 'sourov']);
    });
  });

  describe('pop', () => {
    it('should pop and return the top most element from the stack', () => {
      const strStack = createStack<string>('gourab', 'sourov');
      assert.strictEqual(strStack.pop(), 'sourov');
      assert.deepStrictEqual(strStack.toArray(), ['gourab']);
    });

    it('should give nothing when the stack is empty', () => {
      const strStack = createStack<string>();
      assert.strictEqual(strStack.pop(), undefined);
    });
  });

  describe('peek', () => {
    it('should give top element of the stack', () => {
      const strStack = createStack<string>('gourab', 'sourov');
      assert.strictEqual(strStack.peek(), 'sourov');
    });

    it('should give nothing for no elements in the stack', () => {
      const emptyStack = new Stack<string>();
      assert.strictEqual(emptyStack.peek(), undefined);
    });
  });

  describe('clear', () => {
    it('should clear the stack', () => {
      const strStack = createStack<string>('gourab', 'sourov');

      strStack.clear();

      assert.deepStrictEqual(strStack.toArray(), []);
    });
  });
});
