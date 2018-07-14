const isAsyncFunc = (func) => {
  return func && func.constructor && func.constructor.name === 'AsyncFunction';
};

const isSyncFunc = (func) => {
  return typeof func === 'function' && !isAsyncFunc(func);
};

const isPromise = (func) => {
  return func instanceof Promise;
};

module.exports = {
  isAsyncFunc,
  isSyncFunc,
  isPromise,
};
