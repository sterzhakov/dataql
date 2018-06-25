const getData = require('../getData')

// TODO: duplicate resolver names

describe('getData()', () => {

  it('get sync data', () => {

    const params = {
      _id: 1
    }

    const query = {
      sync: {
        post: {
          _id: null,
          name: null,
          author: {
            _id: null,
            email: null,
          },
          comments: [
            {
              _id: null,
              author_id: null,
              post_id: null,
              description: null,
            }
          ]
        }
      }
    }

    const resolvers = {

      post(params, context) {
        return {
          _id: params._id,
          name: 'example',
        }
      },

      postAuthor(post, context) {
        return {
          _id: 1,
          email: 'example@mail.ru',
        }
      },

      postComments(post, context) {
        return [
          {
            _id: 1,
            author_id: 1,
            post_id: 1,
            description: 'Hello world!',
          }
        ]
      }

    }

    const data = getData({resolvers, query, params})

    // expect(data).toEqual({
    //   post: {
    //     _id: 1,
    //     name: 'example',
    //     author: {
    //       _id: 1,
    //       email: 'example@mail.ru',
    //     },
    //     comments: [
    //       {
    //         _id: 1,
    //         author_id: 1,
    //         post_id: 1,
    //         description: 'Hello world!',
    //       }
    //     ]
    //   }
    // })

  })

})
