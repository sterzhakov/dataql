const B = require('berries');
const normalizeQuery = require('./normalizeQuery');
const createInfo = require('./createInfo');

const createResponse = async (entity, resolver, resolverArgs) => {
  if (entity !== undefined) return entity;
  if (typeof resolver !== 'function') return null;
  const response = await resolver(...resolverArgs);
  if (response !== undefined) return response;
  return null;
};

const ERROR_QUERY_RESOLVER_TYPE_MESSAGE = (
  'For query key: :queryKey, ' +
  'source result type must be an: :queryValueType. ' +
  'Current type: :responseType.'
);

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createErrorMessageForQueryResolverType = (params = {}) => {
  const {queryKey, queryValueType, responseType} = params;

  return ERROR_QUERY_RESOLVER_TYPE_MESSAGE
    .replace(':queryKey', queryKey)
    .replace(':queryValueType', capitalize(queryValueType))
    .replace(':responseType', capitalize(responseType));
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
    if (queryValueType === 'array') {
      if (responseType !== 'array') {
        const errorMessage = createErrorMessageForQueryResolverType({
          queryKey, queryValueType, responseType,
        });
        asyncMapResolve(new Error(errorMessage));
      }
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
      }).catch((error) => {
        asyncMapResolve(error);
      });
    } else if (queryValueType === 'object') {
      if (responseType !== 'object') {
        const errorMessage = createErrorMessageForQueryResolverType({
          queryKey, queryValueType, responseType,
        });
        asyncMapResolve(new Error(errorMessage));
      }
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
