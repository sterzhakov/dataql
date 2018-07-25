const B = require('berries');

const createNullForNotObject = (value) => {
  const isArrayOrObjectOrNull = typeof value === 'object';
  return isArrayOrObjectOrNull ? value : null;
};

const createNullForEmptyObject = (value) => {
  const valueType = B.kindOf(value);
  if (
    isEmptyArray(value, valueType) ||
    isEmptyObject(value, valueType)
  ) return null;

  return value;
};

const isEmptyObject = (value, type) => {
  return (
    type === 'object' &&
    value !== null &&
    !Object.keys(value).length
  );
};

const isEmptyArray = (value, type) => {
  return (
    type === 'array' &&
    !value.length
  );
};

const normalizeQuery = (query) => {
  const queryType = B.kindOf(query);
  if (!B.include(['array', 'object'], queryType))
    throw new Error('Query must be an array or object');

  if (queryType === 'array') {
    return query.map((childQuery) => {
      return normalizeQuery(childQuery);
    });
  }

  return Object.keys(query).reduce((newQuery, queryKey) => {
    const queryValue = query[queryKey];

    const formatQueryValue = B.compose(
      createNullForNotObject,
      createNullForEmptyObject,
    );

    const newQueryValue = formatQueryValue(queryValue);

    const newQueryValueWithChilds = newQueryValue !== null
      ? normalizeQuery(newQueryValue)
      : newQueryValue;

    return { ...newQuery, [queryKey]: newQueryValueWithChilds };
  }, {});
};

module.exports = normalizeQuery;
