const getSyncData = require('./getSyncData')
const getAsyncData = require('./getAsyncData')

/**
 * Fetch data from all resolvers by query
 *
 * @param {Object} args
 *   @param {Array.<Function>} args.resolvers - functions which return data
 *   @param {Object} args.query - query by which resolvers will be filtered
 *   @param {Object} args.params - params for resolvers
 *
 * @returns {Object} data - data collected from resolvers
 */

const getData = (args) => {

  const { query } = args

  const syncData = ('sync' in query)
    ? getSyncData({ ...args, query: query.sync })
    : {}

  const asyncData = ('async' in query)
    ? getAsyncData({ ...args, query: query.async })
    : {}

  return { ...syncData, ...asyncData }

}

module.exports = getData
