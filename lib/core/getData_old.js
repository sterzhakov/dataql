const B = require('berries')

/**
 * Fetch data from all resolvers by query
 *
 * @param {Object} args
 *   @param {Object.<Function> args.resolvers -
 *   object with functions which returns data
 *   @param {Object} args.query - query by which resolvers will be filtered
 *   @param {Object} args.params - params for resolvers
 *   @param {Object} args.root - data from parent resolver
 *   @param {Object} args.info - query info
 *
 * @returns {Object} data - data collected from resolvers
 */

// TODO: add array support

const getData = (args, getDataDone) => {

  const {
    query = {},
    data = {},
    resolvers = {},
    context = {},
    info = {},
  } = args

  const queryKeys = Object.keys(query)

  if (Array.isArray(query)) {

    return B.asyncMap(query[0], (queryKey, index, asyncMapDone) => {



    })

  }

  return B.asyncMap(queryKeys, (queryKey, index, asyncMapDone) => {

    if (queryKey in data) {

      const queryType = B.kindOf(query[queryKey])

      if (B.include(['object', 'array'], queryType)) {

        asyncMapDone({
          [queryKey]: getData({
            query: query[queryKey],
            data: data[queryKey],
            resolvers,
            params,
            context,
            info,
          })
        })

      } else {

        asyncMapDone({ [queryKey]: data[queryKey] })

      }


    } else

    if (queryKey in resolvers) {

      const resolver = resolvers[queryKey]

      const resolverArgs = [1,2,3]

      fetchResolverData(...resolverArgs).then((resolverData) => {

        // do something with childs

      })

    } else {

      asyncMapDone({ [queryKey]: null })

    }

  }).then(fetchedData => {

    getDataDone(fetchedData)

  })


}

module.exports = getData
