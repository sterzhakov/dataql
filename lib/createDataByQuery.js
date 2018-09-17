const B = require('berries');
const normalizeQuery = require('./normalizeQuery');
const createInfo = require('./createInfo');

const createDataByQuery = (params = {}) => {
  const query = normalizeQuery(params.query);
  const queryKeys = Object.keys(query);
  const { context, root, queryParams } = params;

  return B.asyncMap(queryKeys, async (queryKey, index, asyncMapResolve) => {
    const queryValue = params.query[queryKey];
    const entity = params.entities[queryKey];
    const resolver = params.resolvers[queryKey];
    const info = params.info;
    const newInfo = createInfo({ queryValue, queryValueType, info });
    const queryValueType = B.kindOf(queryValue);
    const response = (
      entity ||
      await resolver(root, queryParams, context, newInfo)
    );
    const responseType = B.kindOf(response);

    if (queryValueType === 'array') {
      const nestedQueryValues = queryValue;
      B.asyncMap(nestedQueryValues,
        async (nestedQueryValue, index, nestedAsyncMapResolve) => {
          nestedAsyncMapResolve(
            null,
            await createDataByQuery({
              ...params,
              query: queryValue[0],
              entity: response[index],
            })
          );
        }
      ).then((newQueryValues) => {
        asyncMapResolve(null, { [queryKey]: newQueryValues });
      });
    } else if (queryValueType === 'object' && responseType === 'object') {
      createDataByQuery({
        ...params,
        query: queryValue,
        entity: response[queryKey],
      }).then((newQueryValue) => {
        asyncMapResolve(null, { [queryKey]: newQueryValue });
      });
    } else {
      return {
        [queryKey]: response,
      };
    }
  }).then(queryValues => {
    return queryValues.reduce((queryValues, queryValue) => {
      return { ...queryValues, ...queryValue };
    }, {});
  });
};

module.exports = createDataByQuery;
