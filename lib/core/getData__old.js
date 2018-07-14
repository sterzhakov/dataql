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

  const typeofQuery = B.kindOf(query)

  if (typeofQuery === 'array') {

    

  } else

  if (typeofQuery === 'object') {



  } else {

    throw new Error(
      'Invalid type of query: ' +
      typeofQuery +
      'It must be [Array] or {Object}.'
    )

  }

}

module.exports = getData
