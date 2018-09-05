const createDataForArray = (params = {}) => {
  if (!Array.isArray(queryValue)) return params;

  if (!Array.isArray(newEntities))
    throw new Error(`Result of source ${queryKey} must be an array.`);

  B.asyncMap(newEntities, (newEntity, index, newAsyncMapResolve) => {
    // call fetchQueryRecurs
    // .then(
    //   newQueryValue => newAsyncMapResolve(null, newQueryValue)
    // );
  }).then(
    sourceValue => asyncMapResolve(null, { [queryKey]: sourceValue })
  );
}

module.exports = createDataForArray;
