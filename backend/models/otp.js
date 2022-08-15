const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const otpSchema = new Schema({
  user_id: { type: String, required: true },
  otp: { type: String, required: true },
}, {
  timestamps: true,
});

const OTP = mongoose.model('otp', otpSchema);

module.exports = OTP;