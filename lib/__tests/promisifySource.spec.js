const promisifySource = require('../promisifySource');

const describePath = [
  "/core/createQueryValue",
  "/lib/createInitial" ,
  "/lib/promisifySource",
].join('');

describe(describePath, () => {
  it('wrap sync function into resolved promise', (done) => {
    const source = { test: 'test' };
    promisifySource(source).then((data) => {
      expect(data).toEqual(source);
      done();
    });
  });

  it('just return async function result (promise)', (done) => {
    const resolverResult = { test: 'test' };
    const createTest = () => new Promise((resolve) => {
      setImmediate(() => {
        resolve(resolverResult);
      });
    });
    const source = async () => {
      return await createTest();
    };
    promisifySource(source).then((data) => {
      expect(data).toEqual(resolverResult);
      done();
    });
  });

  it('just return sync function result (promise)', (done) => {
    const resolverResult = { test: 'test' };
    const source = () => new Promise((resolve) => {
      setImmediate(() => {
        resolve(resolverResult);
      });
    });
    promisifySource(source).then((data) => {
      expect(data).toEqual(resolverResult);
      done();
    });
  });

  it('wrap object into resolved promise', (done) => {
    const source = { test: 'test' };
    promisifySource(source).then((data) => {
      expect(data).toEqual(source);
      done();
    });
  });

  it('wrap number into resolved promise', (done) => {
    const source = 123;
    promisifySource(source).then((data) => {
      expect(data).toEqual(source);
      done();
    });
  });

  it('wrap string into resolved promise', (done) => {
    const source = 'test';
    promisifySource(source).then((data) => {
      expect(data).toEqual(source);
      done();
    });
  });

  it('wrap array into resolved promise', (done) => {
    const source = ['test'];
    promisifySource(source).then((data) => {
      expect(data).toEqual(source);
      done();
    });
  });
});
