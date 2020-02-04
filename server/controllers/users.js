require('regenerator-runtime');
const logger = require('log4js').getLogger('reqviews');
const User = require('../model/user');
const responseService = require('../services/response');
const ctrl = {};

ctrl.listUsers = async (req, res) => {
  await User.find()
    .then(users => {
      if (users)
        return responseService.json(res, 200, users);
    
      throw new Error('Whoops, no users yet!');
    })
    .catch(err => logger.warn(err.message));
};

ctrl.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await User.findById(id);

    responseService.json(res, 200, post);
  }
  catch (err) {
    logger.warn(err.message);
    responseService.json(res, 404, err);
  }
};

ctrl.createUser = async (req, res) => {
  try {
    logger.info('Creating User...');
    const user = await User.create(req.body);

    responseService.json(res, 201, user);
  }
  catch (err) {
    logger.warn(err.message);
    responseService.json(res, 400, err);
  }
};

ctrl.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    logger.info(`Deleting user with id: ${id}`);

    await User.findByIdAndDelete(id);

    responseService.json(res, 204, {});
  }
  catch (err) {
    logger.warn(err.message);
    responseService.json(res, 400, err);
  }
};

module.exports = ctrl;
