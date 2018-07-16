const fetchFromResolver = (resolver, ...resolverArgs) => {
  return new Promise((resolve) => {
    const result = resolver(...resolverArgs);
    resolve(result);
  });
};

module.exports = fetchFromResolver;
