const mongoose = require('mongoose');
const logger = require('log4js').getLogger('db');

const url = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URL : 'mongodb://127.0.0.1:27017/mern-core-dev';

/**
 * If you're running into production env., make sure to set additional options, such as:
 * 
 * ssl
 * sslValidate
 * sslCA
 */
const opt = process.env.NODE_ENV === 'production' ? {
  ssl: true,
  sslValidate: true,
  sslCA: ['https://mern-core.netlify.com/'],
  useNewUrlParser: true,
  useUnifiedTopology: true
} : {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const errHandler = err => {
  if (err) {
    logger.error(`Mongoose connection error:\n${err}`);
    process.exit(1);
  }
};

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => logger.info(`Mongoose connected to: ${url}`));
mongoose.connection.on('error', errHandler);
mongoose.connection.on('disconnected', () => logger.info(`Mongoose disconnected from:\n ${url}`));

mongoose.connect(url, opt, errHandler);
