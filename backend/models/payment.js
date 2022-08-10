const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  host_id: { type: String, required: true },
  renter_id: { type: String, required: true },
  property_id: { type: String, required: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  token_id: { type: String, required: true },
  charge_id: { type: String, required: true },
  customer_id: { type: String, required: true },
  payment_method:{ type: String, required: true },
}, {
  timestamps: true,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;