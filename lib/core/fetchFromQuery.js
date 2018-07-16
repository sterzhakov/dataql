// TODO: add context, params,

const B = require('berries');
const fetchFromResolver = require('./fetchFromResolver');

const fetchSource = (source, ...resolverArgs) => {
  const resolver = (typeof source === 'object')
    ? () => source
    : source;

  return fetchFromResolver(resolver, ...resolverArgs);
};

const fetchQuery = ({ query, entities = {}, resolvers = {} }) => {
  const queryKeys = Object.keys(query);

  return B.asyncMap(queryKeys, (queryKey, index, asyncMapResolve) => {
    const queryValue = query[queryKey];

    const sources = [entities, resolvers];
    const source = sources.find(source => queryKey in source);

    if (queryValue === null) {
      asyncMapResolve(null, { [queryKey]: source[queryKey] });
    } else
    if (Array.isArray(queryValue)) {
      fetchSource(source[queryKey]).then(newEntities => {
        if (!Array.isArray(newEntities))
          throw new Error(`Result of source ${queryKey} must be an array.`);

        B.asyncMap(newEntities, (newEntity, index, newAsyncMapResolve) => {
          fetchQuery({
            query: queryValue[0],
            entities: newEntity,
            resolvers,
          }).then(newQueryValue => newAsyncMapResolve(null, newQueryValue));
        }).then(
          sourceValue => asyncMapResolve(null, { [queryKey]: sourceValue })
        );
      });
    } else {
      fetchSource(source[queryKey]).then(sourceValue => {
        fetchQuery({
          query: queryValue,
          entities: sourceValue,
          resolvers,
        }).then(
          sourceValue => asyncMapResolve(null, { [queryKey]: sourceValue })
        );
      });
    }
  }).then((queryValues) => {
    return queryValues.reduce(
      (queryResult, queryValue) => ({ ...queryResult, ...queryValue }),
    {});
  });
};

module.exports = fetchQuery;
