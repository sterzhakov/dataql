const B = require('berries');
const normalizeQuery = require('./normalizeQuery');
const fetchFromSource = require('./fetchFromSource');
const createInfo = require('./createInfo');
const createQueryValue = require('./createQueryValue');

const createDataByQuery = (params = {}) => {
  const query = normalizeQuery(params.query);
  const queryKeys = Object.keys(query);

  return B.asyncMap(queryKeys, async (queryKey, index, asyncMapResolve) => {
    const queryValue = params.query[queryKey];
    const entity = params.entities[queryKey];
    const resolver = params.resolvers[queryKey];
    const info = params.info;
    const newInfo = createInfo({ queryValue, queryValueType, info });
    const queryValueType = B.kindOf(queryValue);
    const {
      entityResult,
      resolverResult,
    } = fetchFromSource(
      { entity, resolver },
      params.root,
      params.queryParams,
      params.context,
      newInfo,
    );
    const newQueryValue = await createQueryValue({
      ...params,
      query,
      queryKey,
      queryKeys,
      entity,
      resolver,
      queryValueType,
      info: newInfo,
      entityResult,
      resolverResult,
    });
    asyncMapResolve(null, newQueryValue);
  }).then(queryValues => {
    return queryValues.reduce((queryValues, queryValue) => {
      return { ...queryValues, ...queryValue };
    }, {});
  });
};

module.exports = createDataByQuery;
