const mongoose = require('mongoose');
const logger = require('log4js').getLogger('db');

const uri = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URL : 'mongodb://127.0.0.1:27017/mern-core-dev';

/**
 * If you're running into production env., make sure to set additional options, such as:
 * 
 * ssl
 * sslValidate
 * sslCA
 * const fs = require('fs');
 * const ca = fs.readFileSync(`${__dirname}/../ssl/certificate1`);
 */

const opt = process.env.NODE_ENV === 'production' ? {
  // ssl: true,
  // sslValidate: true,
  // sslCA: [ca1],
  // checkServerIdentity: false,
  useNewUrlParser: true,
  useUnifiedTopology: true, // this should comment out while a ssl is active.
  socketTimeoutMS: 300000,
  family: 4,
  reconnectInterval: 1000
} : {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 300000,
  family: 4,
  reconnectInterval: 1000
};

const errHandler = err => {
  if (err) {
    logger.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  }
};

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => logger.info(`Mongoose connected to: ${uri}`));
mongoose.connection.on('error', errHandler);
mongoose.connection.on('disconnected', () => logger.info(`Mongoose disconnected from: ${uri}`));

mongoose.connect(uri, opt, errHandler);
