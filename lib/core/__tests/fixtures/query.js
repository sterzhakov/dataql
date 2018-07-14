module.exports = {
  post: {
    _id: null,
    name: null,
    author: {
      _id: null,
      email: null,
    },
    comments: [
      {
        _id: null,
        author_id: null,
        post_id: null,
        description: null,
      }
    ]
  }
}
