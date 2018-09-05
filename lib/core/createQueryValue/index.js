const B = require('berries');
const createForArray = require('./lib/createForArray');
const createForNull = require('./lib/createForNull');
const createForObject = require('./lib/createForObject');
const createForOthers = require('./lib/createForOthers');

const createQueryValue = B.asyncCompose(
  createForOthers,
  createForNull,
  createForArray,
  createForObject,
);

module.exports = createQueryValue;
