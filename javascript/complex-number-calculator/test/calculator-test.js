const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('../src/calculator');
const { Real } = require('complex_number');

const createSpyFunction = () => {
   let calls = 0;

   const fn = (...args) => {
      calls++;
      fn.calls = [...(fn.calls || []), { args }];
   }

   fn.wasCalledOnce = (...args) => {
      if (calls != 1) return false;
      if (args.length === 0) return true;
      if (args.length !== fn.calls[0].args.length) return false;

      return args.every((arg, i) => (arg === fn.calls[0].args[i]));
   }

   return fn;
}

describe('calculator', () => {
   describe('validOperators', () => {
      it('Should give add and multiply as valid operators', () => {
         const calculator = new Calculator(null);
         assert.deepStrictEqual(calculator.validOperators, ['add', 'multiply'])
      });
   });

   describe('renderBalance', () => {
      it('Balance is picked up from the contructor', () => {
         const calculator = new Calculator(5);
         const render = createSpyFunction();
         calculator.renderBalance(render);
         assert.ok(render.wasCalledOnce(5));
      });
   });

   describe('add', () => {
      it('adds a number to the balance', () => {
         const number = {
            value: 0,
            add(value) {
               this.value += value;
               return this;
            }
         };

         const fakeRender = createSpyFunction();

         const calculator = new Calculator(number);
         calculator.operate('add', 5);
         calculator.renderBalance(fakeRender);

         assert.deepStrictEqual(fakeRender.calls[0].args[0].value, 5);
      });
   });
});