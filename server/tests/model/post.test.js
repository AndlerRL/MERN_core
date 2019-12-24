const Post = require('../../model/post');
const validation = require('../utils/validation');

describe('Post Model', () => {
  it('should be invalid if first or any require attr is missing, this case first', done => {
    const post = new Post();
    
    post.validate(err => {
      validation.require('first', err);
      done();
    });
  });
});
