const B = require('berries');

const fetchSource = (source) => new Promise((resolve) => {
  const sourceType = B.kindOf(source);

  if (sourceType === 'object') {
    resolve(source);
  } else {
    resolve(null);
  }
});

// TODO: separate resolvers scope inside one function
const fetchQuery = ({ query, data, resolvers = [] }) => {
  const queryKeys = Object.keys(query);

  return B.asyncMap(queryKeys, (queryKey, index, asyncMapResolve) => {
    const queryValue = query[queryKey];

    const sources = [data, resolvers];
    const source = sources.find(source => queryKey in source);

    if (queryValue === null) {
      asyncMapResolve(null, { [queryKey]: source[queryKey] });
    } else
    if (Array.isArray(queryValue)) {
      fetchSource(source[queryKey]).then(newSourceValues => {
        if (!Array.isArray(newSourceValues))
          throw new Error(`Result of source ${queryKey} mut be an array.`);

        B.asyncMap(newSourceValues, (newSourceValue, index, newAsyncMapResolve) => {
          fetchQuery({
            query: queryValue[0],
            data: newSourceValue,
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
          data: sourceValue,
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
