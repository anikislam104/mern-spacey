const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user_id: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String , default: "notification"},
}, {
  timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;