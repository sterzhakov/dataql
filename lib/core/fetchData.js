const B = require('berries');
const fetchQueryFromData = require('./fetchQueryFromData');
const normalizeQuery = require('./normalizeQuery');

const withNormalizedQuery = (params) => {
  const newQuery = normalizeQuery(params.query);
  return { ...params, query: newQuery };
};

const fetchData = B.compose(
  fetchQueryFromData,
  withNormalizedQuery,
);

module.exports = fetchData;
