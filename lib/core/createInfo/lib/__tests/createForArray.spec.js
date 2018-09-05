const createForArray = require('../createForArray');

const describePath = [
  "/core/createQueryValue",
  "/lib/createInitial" ,
  "/lib/createInfo",
  "/lib/createForArray",
].join('');

describe(describePath, () => {
  it("extend info object query: queryValue[0] for queryValue type array", () => {
    const params = {
      queryValueType: 'array',
      queryValue: [{ id: 1 }],
      info: { name: 'info' },
    };

    expect(
      createForArray(params)
    ).toEqual({
      queryValueType: 'array',
      queryValue: [{ id: 1 }],
      info: {
        name: 'info',
        query: { id: 1 },
      },
    });
  });
})
