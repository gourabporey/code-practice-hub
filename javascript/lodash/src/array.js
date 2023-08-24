const { chunk, compact } = require('lodash');

console.log(chunk([1, 2, 3, 4], 3));

console.log(compact([1, 3, false, undefined, null, 7]));
