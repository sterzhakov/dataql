/*eslint no-console: "off"*/
const B = require('berries');
const fetchQueryFromData = require('../fetchQueryFromData');

const entities = {
  post: {
    _id: 1,
    name: 'Igor',
    hello: 'world',
    comments: [
      {
        _id: 1,
        description: 'Hello world!',
        authorId: 1,
      },
      {
        _id: 2,
        description: 'Hello universe!',
        authorId: 2,
      },
    ]
  },
};

const resolvers = {
  post: () => {
    return B.omit(entities.post, 'comments');
  },
  comments: () => {
    return entities.post.comments;
  },
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const asyncResolvers = {
  async post() {
    await wait(10);
    return B.omit(entities.post, 'comments');
  },
  async comments() {
    await wait(10);
    return entities.post.comments;
  },
};

describe('core/fetchQueryFromData()', () => {
  describe('fetch data from entities', () => {
    it('which is object', (done) => {
      const query = {
        post: {
          _id: null,
          name: null,
        },
      };

      fetchQueryFromData({ query, entities }).then(result => {
        expect(result).toEqual({
          post: {
            _id: 1,
            name: 'Igor',
          },
        });
        done();
      }).catch(error => console.log(error));
    });

    it('which is array', (done) => {
      const query = {
        post: {
          _id: null,
          name: null,
          comments: [
            {
              _id: null,
              description: null,
            }
          ]
        },
      };

      fetchQueryFromData({ query, entities }).then(result => {
        expect(result).toEqual({
          post: {
            _id: 1,
            name: 'Igor',
            comments: [
              {
                _id: 1,
                description: 'Hello world!',
              },
              {
                _id: 2,
                description: 'Hello universe!',
              },
            ]
          },
        });
        done();
      }).catch(error => console.log(error));
    });
  });

  describe('fetch data from resolvers', () => {
    it('which return object', (done) => {
      const query = {
        post: {
          _id: null,
          name: null,
        },
      };

      fetchQueryFromData({ query, resolvers }).then(result => {
        expect(result).toEqual({
          post: {
            _id: 1,
            name: 'Igor',
          },
        });
        done();
      }).catch(error => console.log(error));
    });

    it('which return array', (done) => {
      const query = {
        post: {
          _id: null,
          name: null,
          comments: [
            {
              _id: null,
              description: null,
            }
          ]
        },
      };

      fetchQueryFromData({ query, resolvers }).then(result => {
        expect(result).toEqual({
          post: {
            _id: 1,
            name: 'Igor',
            comments: [
              {
                _id: 1,
                description: 'Hello world!',
              },
              {
                _id: 2,
                description: 'Hello universe!',
              },
            ]
          },
        });
        done();
      }).catch(error => console.log(error));
    });
  });

  describe('fetch data from async resolvers', () => {
    it('which return object', (done) => {
      const query = {
        post: {
          _id: null,
          name: null,
        },
      };

      fetchQueryFromData({ query, resolvers: asyncResolvers }).then(result => {
        expect(result).toEqual({
          post: {
            _id: 1,
            name: 'Igor',
          },
        });
        done();
      }).catch(error => console.log(error));
    });

    it('which return array', (done) => {
      const query = {
        post: {
          _id: null,
          name: null,
          comments: [
            {
              _id: null,
              description: null,
            }
          ]
        },
      };

      fetchQueryFromData({ query, resolvers: asyncResolvers }).then(result => {
        expect(result).toEqual({
          post: {
            _id: 1,
            name: 'Igor',
            comments: [
              {
                _id: 1,
                description: 'Hello world!',
              },
              {
                _id: 2,
                description: 'Hello universe!',
              },
            ]
          },
        });
        done();
      }).catch(error => console.log(error));
    });
  });

  describe('pass arguments to resolver', () => {
    it('pass root', (done) => {
      const query = {
        post: {
          _id: null,
          name: null,
          comments: [
            {
              _id: null,
              description: null,
            },
          ],
        },
      };

      spyOn(resolvers, 'comments').and.callThrough();

      fetchQueryFromData({ query, resolvers }).then(() => {
        expect(
          resolvers.comments.calls.argsFor(0)[0]
        ).toEqual(
          B.omit(entities.post, 'comments')
        );
        done();
      }).catch(error => console.log(error));
    });

    it('pass params', (done) => {
      const query = {
        post: {
          _id: null,
          name: null,
          comments: [
            {
              _id: null,
              description: null,
            },
          ],
        },
      };

      const params = {
        userId: 1
      };

      spyOn(resolvers, 'comments').and.callThrough();

      fetchQueryFromData({ query, resolvers, params }).then(() => {
        expect(
          resolvers.comments.calls.argsFor(0)[1]
        ).toEqual(
          params
        );
        done();
      }).catch(error => console.log(error));
    });

    it('pass context', (done) => {
      const query = {
        post: {
          _id: null,
          name: null,
          comments: [
            {
              _id: null,
              description: null,
            },
          ],
        },
      };

      const context = {
        example: 'text',
      };

      spyOn(resolvers, 'comments').and.callThrough();

      fetchQueryFromData({ query, resolvers, context }).then(() => {
        expect(
          resolvers.comments.calls.argsFor(0)[2]
        ).toEqual(
          context
        );
        done();
      }).catch(error => console.log(error));
    });

    it('pass info.query', (done) => {
      const query = {
        post: {
          _id: null,
          name: null,
          comments: [
            {
              _id: null,
              description: null,
            },
          ],
        },
      };

      spyOn(resolvers, 'comments').and.callThrough();

      fetchQueryFromData({ query, resolvers }).then(() => {
        expect(
          resolvers.comments.calls.argsFor(0)[3].query
        ).toEqual(
          query.post.comments[0]
        );
        done();
      }).catch(error => console.log(error));
    });
  });

  describe('sniper cases', () => {
    it('full result from resolver when query key is null', () => {
      const query = {
        test: null,
      };

      const newResolvers = {
        test() { return 'test'; }
      };

      fetchQueryFromData({ query, resolvers: newResolvers }).then((data) => {
        expect(data).toEqual({ test: 'test' });
      });
    });
  });
});
