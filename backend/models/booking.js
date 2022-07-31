const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    host_id: { type: String, required: true },
    renter_id: { type: String, required: true },
    date: { type: Date, required: true },
    property_id: { type: String, required: true },
    start_time: { type: String },
    end_time: { type: String },
}, {
  timestamps: true,
});

const Booking= mongoose.model('Booking', bookingSchema);

module.exports = Booking;