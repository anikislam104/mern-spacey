const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  nidNumber: { type: Number, required: true },
  phoneNumber: { type: Number, required: true },
  dateOfBirth: { type: Date, required: true },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;