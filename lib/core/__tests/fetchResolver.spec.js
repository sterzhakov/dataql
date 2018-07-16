const fetchFromResolver = require('../fetchFromResolver');

describe('core/fetchFromResolver return true from', () => {
  it('resolver which return "test"', (done) => {
    const syncFunc = (name) => { return name; };
    fetchFromResolver(syncFunc, 'test').then(data => {
      expect(data).toBe('test');
      done();
    });
  });

  it('async resolver which return "test"', (done) => {
    const asyncFunc = async (name) => { return name; };
    fetchFromResolver(asyncFunc, 'test').then(data => {
      expect(data).toBe('test');
      done();
    });
  });

  it('resolver which return promise which resolve "test"', (done) => {
    const resolver = (name) => {
      return new Promise((resolve) => resolve(name));
    };
    fetchFromResolver(resolver, 'test').then(data => {
      expect(data).toBe('test');
      done();
    });
  });
});
