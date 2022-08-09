const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogReactionSchema = new Schema({
  blog_id: { type: String, required: true },
  user_id: { type: String, required: true },
  hasUserLiked: { type: Boolean, required: true,default:false },
  hasUserDisliked: { type: Boolean, required: true,default:false },
}, {
  timestamps: true,
});

const BlogReaction = mongoose.model('blogReaction', blogReactionSchema);

module.exports = BlogReaction;