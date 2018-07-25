const normalizeQuery = require('../normalizeQuery');

describe('core/normalizeQuery', () => {
  it('normalize query', () => {
      const query = {
        test: [
          {
            number: 1,
            string: 'two',
            false: false,
            true: true,
            infinity: Infinity,
            zero: 0,
            object: {},
            array: [],
          },
        ]
      };

      const normalizedQuery = normalizeQuery(query);
      expect(normalizedQuery).toEqual({
        test: [
          {
            number: null,
            string: null,
            false: null,
            true: null,
            infinity: null,
            zero: null,
            object: null,
            array: null,
          },
        ]
      });
  });
});
