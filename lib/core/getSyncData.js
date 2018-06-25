const B = require('berries')

/**
 * Fetch data from sync resolvers by query
 *
 * @param {Object} args
 *   @param {Array.<Function>} args.resolvers - functions which return data
 *   @param {Object} args.query - query by which resolvers will be filtered
 *   @param {Object} args.params - params for resolvers
 *
 * @returns {Object} data - data collected from resolvers
 */

const getSyncData = ({ resolvers, query, params }) => {

  console.log({ resolvers, query, params })

  // return Object.keys(resolvers)

  return {}

}

module.exports = getSyncData
