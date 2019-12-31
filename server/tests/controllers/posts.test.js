const ctrl = require('../../controllers/posts');
const Post = require('../../model/post');
const sinon = require('sinon');

describe('Posts Controller', () => {
  const { assert } = sinon;
  let req = {};
  let res = {};

  beforeEach(() => {
    const spy = sinon.spy();

    req = { params: {} };
    res = {
      status: spy,
      json: spy,
    };
  });

  /* const assertOnceWith = (stub, val) => {
    assert.calledOnce(stub);
    assert.calledWith(stub, val);
  }; */

  describe('.listReviews', () => {
    beforeEach(() => {
      sinon.stub(Post, 'find');
    });
  });

  afterEach(() => {
    Post.find.restore;
  });

  it('should return 200 with posts list as soon json success.', () => {
    const expectedPosts = ['First Post', 'Second Post'];

    try {
      expect(ctrl.listPosts(req, res)).resolves.toEqual(expect.any(Array));
    }
    finally {
      assert.notCalled(res.status);
      assert.neverCalledWith(res.json, 200, expectedPosts);
    }
  });

  it('should return 500 with the error json.', () => {
    const expectedError = {
      message: 'Fatality!'
    };

    sinon.stub(Post, 'find').rejects(expectedError);

    try {
      ctrl.listPosts(req, res);
    }
    finally {
      assert.notCalled(res.status);
      assert.neverCalledWith(res.json, 500, expectedError);
    }
  });
});
