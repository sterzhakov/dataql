const fetchFromSource = (source, ...resolverArgs) => {
  if (typeof source !== 'function')
    return Promise.resolve(source);
  return new Promise((resolve) => {
    const result = source(...resolverArgs);
    resolve(result);
  });
};

module.exports = fetchFromSource;
