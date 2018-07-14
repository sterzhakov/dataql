/*eslint no-console: "off"*/
const fetchQuery = require('../fetchQuery');

describe('core/fetchQuery()', () => {
  it('simple data', (done) => {
    const query = {
      post: {
        _id: null,
        name: null,
      },
    };

    const data = {
      post: {
        _id: 1,
        name: 'Igor',
        hello: 'world',
      }
    };

    fetchQuery({ query, data }).then(result => {
      expect(result).toEqual({
        post: {
          _id: 1,
          name: 'Igor',
        },
      });
      done();
    }).catch(error => console.log(error));
  });
});
