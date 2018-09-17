const createForArray = (params = {}) => {
  const { queryValueType, queryValue, info } = params;

  const newInfo = queryValueType === 'array'
    ? { ...info, query: queryValue[0] }
    : info;

  return { ...params, info: newInfo };
};

module.exports = createForArray;
