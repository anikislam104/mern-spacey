const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  senderId: { type: String, required: true },
  receiverId: {type: String, required: true },
  time: { type: Date, required: false },
  content: { type: String, required: true },
}, {
  timestamps: true,
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;