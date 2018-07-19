# DataQl

Fetching data by query from js object

![dataql](https://raw.githubusercontent.com/sterzhakov/dataql/master/logo.jpg)

## How to install?
```bash
npm i dataql
```

## How it works:

```javascript

  // So you have some functions which return some data

  const resolvers = {
    post(root, params, context, info) {

      return {
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
      }

    }
  }

```
