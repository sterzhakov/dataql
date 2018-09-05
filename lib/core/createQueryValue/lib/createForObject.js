const createDataForObject = (params = {}) => {
  console.log({newEntities})
  fetchQueryFromData({
    query: queryValue,
    queryParams,
    entities: newEntities[queryKey],
    resolvers,
    root: newEntities,
    context,
    info: newInfo,
  }).then(
    newSourceValue => asyncMapResolve(null, { [queryKey]: newSourceValue })
  );
}

module.exprots = createDataForObject;
