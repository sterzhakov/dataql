# DataQl

Fetching data by query from js object

![dataql](https://raw.githubusercontent.com/sterzhakov/dataql/master/logo.jpg?v=1)

## How to install?
```bash
npm i dataql
```

## How it works:

So you have some functions which return some data

```javascript
  const resolvers = {
    post() {
      return {
        post: {
          _id: 1,
          name: 'Igor',
          hello: 'world',
        },
      }
    }

    postComments(post) {
      const comments = [
        {
          _id: 1,
          description: 'Hello world!',
          postId: 1,
        },
        {
          _id: 2,
          description: 'Hello universe!',
          postId: 1,
        },
        {
          _id: 3,
          description: 'Hello universe!',
          postId: 2,
        },
      ]

      return comments.filter(comment => comment.postId == post.id)
    }
  }
```
 also you have a query

```javascript
  const query = {
    post: {
      _id: null,
      name: null,
      comments: [
        _id: null,
        description: null,
      ],      
    }
  }
```

just fetch data by query from resolvers

```javascript
const { fetchData } = require('dataql')

fetchData({ query, resolvers }).then((data) => {
  /*
    console.log(data) =>
    {
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
    }
  */
})
```

## API

### fetchData(args)

return: Promise

**args** Object | {}

**args.query** Object | null

query object where null is any possible value which return resolver.

if your resolver contain an array you should define this in query like this example above

**args.entities** Object | null

object which contains data, first it search data in here if he doesnt found he find in resolver

**args.resolvers** Object | null

object which contains functions called resolvers.
resolvers should return a data

resolver can be a sync function or

**args.root** Object | null

data object passed to first level resolvers

**args.params** Object | null

query params which passed to every resolver

**args.context** Object | null

context object which passed to every resolver

**args.info** Object | { query: {} }

**args.info.query** Object | null

query object for resolver

## resolver(root, params, context, query)

**root** Object | null

object from parent resolver

**params** Object | null

query params

**context** Object | null

context payload

**query** Object | { query: {} }

query for current resolver
