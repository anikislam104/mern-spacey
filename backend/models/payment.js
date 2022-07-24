const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  host_id: { type: String, required: true },
  renter_id: { type: String, required: true },
  
}, {
  timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;