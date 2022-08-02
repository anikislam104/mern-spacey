const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  user_id: { type: String, required: true },
  content: { type: String, required: true },
  title: { type: String, required: true },
  time_created: { type: Date, required: true },
  like_count: { type: Number, required: true },
  dislike_count: { type: Number },
  comments: { type: Array },
  image: { type: String, required: true },
}, {
  timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;