var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var postSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;