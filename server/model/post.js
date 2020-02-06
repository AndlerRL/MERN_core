const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  first: {
    type: String,
    require: true
  },
  last: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true,
  },
  topics: {
    type: Array,
    default: [],
    require: true,
  },
  content: {
    type: Array,
    default: [],
    require: true,
  },
  authorId: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}); 

postSchema.virtual('author').get(function() {
  return `${this.first} ${this.last}`;
});

postSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Post', postSchema);
