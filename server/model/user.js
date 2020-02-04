const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  first: {
    type: String,
    require: true
  },
  last: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: Object,
    require: true
  },
  gender: {
    type: String,
    default: ''
  },
  age: {
    type: String,
    default: ''
  },
  interest: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  }
}); 

userSchema.virtual('username').get(function() {
  return `${this.first}_${this.last}${Math.floor(Math.random() * 999 + 101)}`;
});

userSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('User', userSchema);
