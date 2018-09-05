const createForObject = (params = {}) => {
  const { queryValueType, queryValue, info } = params;

  const newInfo = queryValueType === 'object'
    ? { ...info, query: queryValue }
    : info;

  return { ...params, info: newInfo };
};

module.exports = createForObject;
