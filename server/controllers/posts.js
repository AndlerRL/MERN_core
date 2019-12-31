require('regenerator-runtime');
const logger = require('log4js').getLogger('reqviews');
const Post = require('../model/post');
const responseService = require('../services/response');
const ctrl = {};

ctrl.listPosts = async (req, res) => await Post.find().then(posts => {
  if (posts)
    return responseService.json(res, 200, posts);
  
  throw new Error('Whoops, no posts yet!');
})
  .catch(err => logger.warn(err.message));

ctrl.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    responseService.json(res, 200, post);
  }
  catch (err) {
    logger.warn(err.message);
    responseService.json(res, 404, err);
  }
};

ctrl.createPost = async (req, res) => {
  try {
    logger.info('Creating Post...');
    const post = await Post.create(req.body);

    responseService.json(res, 201, post);
  }
  catch (err) {
    logger.warn(err.message);
    responseService.json(res, 400, err);
  }
};

ctrl.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    logger.info(`Deleting post with id: ${id}`);

    await Post.findByIdAndDelete(id);

    responseService.json(res, 204, {});
  }
  catch (err) {
    logger.warn(err.message);
    responseService.json(res, 400, err);
  }
};

module.exports = ctrl;
