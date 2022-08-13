const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const extendBookingSchema = new Schema({
    booking_id: { type: String, required: true },
    end_date: { type: Date ,required: true},
}, {
  timestamps: true,
});

const ExtendBookingRequest = mongoose.model('ExtendBooking', extendBookingSchema);

module.exports = ExtendBookingRequest;