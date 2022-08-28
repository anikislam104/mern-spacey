const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogCommentSchema = new Schema({
    user_id: { type: String, required: true },
    blog_id: { type: String, required: true },
    user_name: { type: String },
    comment: { type: String, required: true },
}, {
  timestamps: true,
});

const BlogComment = mongoose.model('BlogComment', blogCommentSchema);

module.exports = BlogComment;