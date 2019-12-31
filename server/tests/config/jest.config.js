import mongoose from 'mongoose';

mongoose.Promise = Promise;

export default {
  testEnvironment: 'node',
  testTimeout: 30000
};
