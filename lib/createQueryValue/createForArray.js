const createDataForArray = async (params = {}) => {
  const {
    queryValue,
    queryValueType,
    response,
    queryKey,
  } = params;

  if (queryValueType !== 'array') return params;

  // const promisedResponse = ;

  // const

  B.asyncMap(responses, (response, index, newAsyncMapResolve) => {
    // call fetchQueryRecurs
    // .then(
    //   newQueryValue => newAsyncMapResolve(null, newQueryValue)
    // );
  }).then(
    sourceValue => asyncMapResolve(null, { [queryKey]: sourceValue })
  );
}

module.exports = createDataForArray;
