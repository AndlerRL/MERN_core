/* eslint-disable newline-per-chained-call */
require('regenerator-runtime');
const logger = require('log4js').getLogger('reqviews');
const User = require('../model/user');
const responseService = require('../services/response');
const { createHash } = require('crypto');
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

ctrl.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sha1 = createHash('sha1').update(password, 'utf8').digest('hex');
    const sha256 = createHash('sha256').update(password, 'utf8').digest('hex');
    const sha384 = createHash('sha384').update(password, 'utf8').digest('base64');
    const sha512 = createHash('sha512').update(password, 'utf8').digest('base64');
    
    await User.find({
      email, // String
      'password.sha1': sha1,
      'password.sha256': sha256,
      'password.sha384': sha384,
      'password.sha512': sha512,
    })
      .then(user => {
        console.log(user);

        if (user)
          return responseService.json(res, 200, user);
      
        throw new Error('Whoops, no user on the system!');
      })
      .catch(err => logger.warn(err.message));
  }
  catch (err) {
    logger.warn(err.message);
    responseService.json(res, 404, err);
  }
};

ctrl.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    responseService.json(res, 200, user);
  }
  catch (err) {
    logger.warn(err.message);
    responseService.json(res, 404, err);
  }
};

ctrl.createUser = async (req, res, next) => {
  const { first, last, email, password } = req.body;

  try {
    logger.info('Creating User...');
    
    await User.findOne({
      email
    })
      .then(user => {
        if (user !== null) {
          const message = `I'm sorry, but email ${user.email} already exist on database.`
          logger.warn(message);
          responseService.json(res, 304, null, message);
          res.end();
        } else {
          const newUser = User.create({
            first,
            last,
            email,
            password
          });
  
          newUser
            .then(results => {
              console.log(results);
              responseService.json(res, 201, results);
              res.end();
            })
            .catch(err => {
              logger.warn(err);
              responseService.json(res, 400, null, err);
            });
        }
      })
      .catch(err => {
        logger.warn(err.message);
        responseService.json(res, 404, err);
      });
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
