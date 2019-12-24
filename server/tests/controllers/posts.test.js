const ctrl = require('../../controllers/posts');
const Post = require('../../model/post');
const sinon = require('sinon');

describe('Posts Controller', () => {
  const { assert } = sinon;
  let req;
  let res;

  const assertOnceWith = (stub, val) => {
    assert.calledOnce(stub);
    assert.calledWith(stub, val);
  };

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: sinon.spy(),
      json: sinon.spy(),
    };
  });

  describe('.listReviews', () => {
    beforeEach(() => {
      sinon.stub(Post, 'find');
    });
  });

  afterEach(() => {
    Post.find.restore();
  });

  it('should return 200 with posts list as soon json success.', async () => {
    const expectedPosts = ['First Post', 'Another Post'];
    Post.find.resolves(expectedPosts);

    try {
      await ctrl.listPosts(req, res);
    }
    finally {
      assertOnceWith(res.status, 200);
      assertOnceWith(res.json, expectedPosts);
    }
  });

  it('should return 500 with the error json.', async () => {
    const expectedError = {
      message: 'Fatality!'
    };

    Post.find.rejects(expectedError);

    try {
      await ctrl.listPosts(req, res);
    }
    finally {
      assertOnceWith(res.status, 500);
      assertOnceWith(res.json, expectedError);
    }
  });
});
