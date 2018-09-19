const B = require('berries');
const normalizeQuery = require('./normalizeQuery');
const createInfo = require('./createInfo');

const createResponse = async (entity, resolver, resolverArgs) => {
  if (entity !== undefined) return entity;
  const response = await resolver(...resolverArgs);
  if (response !== undefined) return response;
  return null;
};

const createDataByQuery = (params = {}) => {
  const query = normalizeQuery(params.query);
  const queryKeys = Object.keys(query);
  const { context, root, queryParams } = params;
  return B.asyncMap(queryKeys, async (queryKey, index, asyncMapResolve) => {
    const queryValue = params.query[queryKey];
    const entity = params.entities && params.entities[queryKey];
    const resolver = (params.resolvers || {})[queryKey];
    const info = params.info;
    const queryValueType = B.kindOf(queryValue);
    const newInfo = createInfo({ queryValue, queryValueType, info });
    const resolverArgs = [root, queryParams, context, newInfo];
    const response = await createResponse(entity, resolver, resolverArgs);
    const responseType = B.kindOf(response);
    if (queryValueType === 'array' && responseType === 'array') {
      const nestedResponses = response;
      B.asyncMap(nestedResponses,
        async (nestedResponse, index, nestedAsyncMapResolve) => {
          nestedAsyncMapResolve(
            null,
            await createDataByQuery({
              ...params,
              root,
              query: queryValue[0],
              entities: nestedResponse,
            })
          );
        }
      ).then((newQueryValues) => {
        asyncMapResolve(null, { [queryKey]: newQueryValues });
      });
    } else if (queryValueType === 'object' && responseType === 'object') {
      createDataByQuery({
        ...params,
        root: response,
        query: queryValue,
        entities: response,
      }).then((newQueryValue) => {
        asyncMapResolve(null, { [queryKey]: newQueryValue });
      });
    } else {
      asyncMapResolve(null, { [queryKey]: response });
    }
  }).then(queryValues => {
    return queryValues.reduce((queryValues, queryValue) => {
      return { ...queryValues, ...queryValue };
    }, {});
  });
};

module.exports = createDataByQuery;
