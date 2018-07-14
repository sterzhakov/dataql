const B = require('berries');

const numbers = [1,2,3,4];

B.asyncMap(numbers, (number, index, asyncMapResolve) => {
  asyncMapResolve(null, number);
}).then(console.log);
