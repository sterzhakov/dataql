// const getData = require('../getData')
// const query = require('./fixtures/query')
//
// describe('getData()', () => {
//
//   it('get sync data', (done) => {
//
//     const params = {
//       id: 1,
//     }
//
//     const resolvers = {
//
//       post(params, root, context, info) {
//         return {
//           _id: params.id,
//           name: 'example',
//         }
//       },
//
//       postAuthor(params, post, context, info) {
//         return {
//           _id: 1,
//           email: 'example@mail.ru',
//         }
//       },
//
//       postComments(params, post, context, info) {
//         return [
//           {
//             _id: 1,
//             author_id: 1,
//             post_id: 1,
//             description: 'Hello world!',
//           }
//         ]
//       },
//     }
//
//     getData({resolvers, query, params}, (errors, data) => {
//
//       console.log('Spec:', data)
//
//       done()
//
//     })
//
//     // expect(data).toEqual({
//     //   post: {
//     //     _id: 1,
//     //     name: 'example',
//     //     author: {
//     //       _id: 1,
//     //       email: 'example@mail.ru',
//     //     },
//     //     comments: [
//     //       {
//     //         _id: 1,
//     //         author_id: 1,
//     //         post_id: 1,
//     //         description: 'Hello world!',
//     //       }
//     //     ]
//     //   }
//     // })
//
//   })
//
//
//   it('get async data', () => {
//
//   })
//
// })
