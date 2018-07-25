const B = require('berries');
const fetchFromResolver = require('./fetchFromResolver');

const fetchSource = (source, ...resolverArgs) => {
  const resolver = (typeof source === 'object')
    ? () => source
    : source;

  return fetchFromResolver(resolver, ...resolverArgs);
};


const fetchQueryFromData = (args = {}) => {
  const {
    query,
    entities = {},
    resolvers = {},
    root = null,
    params = null,
    context = null,
    info = null,
  } = args;

  const queryKeys = Object.keys(query);

  return B.asyncMap(queryKeys, (queryKey, index, asyncMapResolve) => {
    const queryValue = query[queryKey];

    const sources = [entities, resolvers];
    const source = sources.find(source => queryKey in source);

    if (queryValue === null) {
      if (typeof source[queryKey] === 'function') {
        fetchSource(source[queryKey], root, params, context, info)
        .then(newEntities => {
          asyncMapResolve(null, { [queryKey]: newEntities });
        });
      } else {
        asyncMapResolve(null, { [queryKey]: source[queryKey] });
      }
    } else
    if (Array.isArray(queryValue)) {
      const newInfo = { ...info, query: queryValue[0] };
      fetchSource(source[queryKey], root, params, context, newInfo)
      .then(newEntities => {
        if (!Array.isArray(newEntities))
          throw new Error(`Result of source ${queryKey} must be an array.`);

        B.asyncMap(newEntities, (newEntity, index, newAsyncMapResolve) => {
          fetchQueryFromData({
            query: queryValue[0],
            entities: newEntity,
            resolvers,
            root,
            params,
            context,
            info: newInfo,
          }).then(newQueryValue => newAsyncMapResolve(null, newQueryValue));
        }).then(
          sourceValue =>
            asyncMapResolve(null, { [queryKey]: sourceValue })
        );
      });
    } else {
      const newInfo = { ...info, query: queryValue };
      fetchSource(source[queryKey], root, params, context, newInfo)
      .then(sourceValue => {
        fetchQueryFromData({
          query: queryValue,
          entities: sourceValue,
          resolvers,
          root: sourceValue,
          params,
          context,
          info: newInfo,
        }).then(
          newSourceValue =>
            asyncMapResolve(null, { [queryKey]: newSourceValue })
        );
      });
    }
  }).then((queryValues) => {
    return queryValues.reduce(
      (queryResult, queryValue) => ({ ...queryResult, ...queryValue }),
    {});
  });
};

module.exports = fetchQueryFromData;
