const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  user_id:
  [{
    type: Schema.Types.ObjectId,ref: 'User'
  }],
  content: { type: String, required: true },
  title: { type: String, required: true },
  time_created: { type: Date, required: true },
  like_count: { type: Number, required: true },
  image: { data: Buffer, contentType: String },
}, {
  timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;