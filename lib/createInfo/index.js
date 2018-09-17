const B = require('berries');
const createForArray = require('./lib/createForArray');
const createForObject = require('./lib/createForObject');

const createInfo = (params) =>
  B.compose(createForArray, createForObject)(params)
  .newInfo;

module.exports = createInfo;
