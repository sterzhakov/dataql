/*eslint no-console: "off"*/
const fetchFromQuery = require('../fetchFromQuery');

// TODO: to entities
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
    return entities.post;
  },
  comments: () => {
    return entities.post.comments;
  },
};

describe('core/fetchFromQuery()', () => {
  describe('fetch data from entities', () => {
    it('which is object', (done) => {
      const query = {
        post: {
          _id: null,
          name: null,
        },
      };

      fetchFromQuery({ query, entities }).then(result => {
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

      fetchFromQuery({ query, entities }).then(result => {
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

      fetchFromQuery({ query, resolvers }).then(result => {
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

      fetchFromQuery({ query, resolvers }).then(result => {
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
    it('pass root');

    it('pass params');

    it('pass context');
  });
});
