const createForNullValue = (params = {}) => {
  const { queryValue } = params;
  if (queryValue !== null) return params;
  return {
    newQueryValue: {
      [queryKey]: newEntities[queryKey]
    },
  }
};

module.exports = createForNullValue;
