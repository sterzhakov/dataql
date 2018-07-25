const fetchData = require('../fetchData');

describe('core/fetchData', () => {
  it('fetch by denormalized query', (done) => {
    const query = {
      test: [
        {
          one: '',
          two: 123,
          three: 'text',
        }
      ]
    };

    const entities = {
      test: [
        {
          one: 'one',
          two: 'two',
          three: 'three',
        },
        {
          one: 'one',
          two: 'two',
          three: 'three',
        }
      ]
    };

    fetchData({ query, entities }).then((data) => {
      expect(data).toEqual(entities);
      done();
    });
  });
});
