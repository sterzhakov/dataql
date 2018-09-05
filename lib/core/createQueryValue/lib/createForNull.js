const createForNullValue = (params = {}) => {
  if (queryValue !== null) return params;
  return {
    newValue: {
      [queryKey]: newEntities[queryKey]
    },
  }
};

module.exports = createForNullValue;
