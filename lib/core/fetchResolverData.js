const {
  isAsyncFunc, isSyncFunc, isPromise
} = require('./checkResolverTypes')

const fetchResolverData = (...resolverArgs) => {

  return new Promise((resolve, reject) => {

    if (isAsyncFunc(resolver) || isPromise(resolver)) {

      resolver(...resolverArgs)
        .then(resolve)
        .catch(reject)

    } else

    if (isSyncFunc(resolver)) {

      const resolverData = resolver(...resolverArgs)

      resolve(resolverData)

    } else {

      throw new Error(
        'Incorrect resolver type.' +
        'Resolver can be async function, promise or pure function.'
      )

    }

  })

}
