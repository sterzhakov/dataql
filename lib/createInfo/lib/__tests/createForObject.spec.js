const createForObject = require('../createForObject');

const describePath = [
  "/core/createQueryValue",
  "/lib/createInitial" ,
  "/lib/createInfo",
  "/lib/createForObject",
].join('');

describe(describePath, () => {
  it("extend info object query: queryValue for queryValue type object", () => {
    const params = {
      queryValueType: 'object',
      queryValue: { id: 1 },
      info: { name: 'info' },
    };

    expect(
      createForObject(params)
    ).toEqual({
      queryValueType: 'object',
      queryValue: { id: 1 },
      info: {
        name: 'info',
        query: { id: 1 },
      },
    });
  })
})
