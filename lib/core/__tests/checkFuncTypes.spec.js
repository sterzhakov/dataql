const { isSyncFunc, isAsyncFunc, isPromise } = require('../checkFuncTypes');

const syncFunc = () => {};
const asyncFunc = async function(){};
const promise = new Promise(() => {});

describe('core/checkFuncTypes', () => {
  describe('isSyncFunc', () => {
    it('is sync', () => {
      expect( isSyncFunc(syncFunc) ).toBeTruthy();
    });

    it('not async', () => {
      expect( isSyncFunc(asyncFunc) ).toBeFalsy();
    });

    it('not promise', () => {
      expect( isSyncFunc(promise) ).toBeFalsy();
    });
  });

  describe('isAsyncFunc', () => {
    it('not sync', () => {
      expect( isAsyncFunc(syncFunc) ).toBeFalsy();
    });

    it('is async', () => {
      expect( isAsyncFunc(asyncFunc) ).toBeTruthy();
    });

    it('not promise', () => {
      expect( isAsyncFunc(promise) ).toBeFalsy();
    });
  });

  describe('isPromisedFunc', () => {
    it('not sync', () => {
      expect( isPromise(syncFunc) ).toBeFalsy();
    });

    it('is async', () => {
      expect( isPromise(asyncFunc) ).toBeFalsy();
    });

    it('not promise', () => {
      expect( isPromise(promise) ).toBeTruthy();
    });
  });
});
