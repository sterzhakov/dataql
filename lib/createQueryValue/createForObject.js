const createDataForObject = async (params = {}) => {
  const {
    queryValueType,
    entity,
    resolver,
    root,
    queryParams,
    context,
    newInfo,
  } = params;

  if (queryValueType !== 'object') return params;



  return { ...params, newQueryValue: response };
};

module.exprots = createDataForObject;
