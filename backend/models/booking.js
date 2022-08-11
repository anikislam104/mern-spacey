const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    host_id: { type: String, required: true },
    renter_id: { type: String, required: true },
    property_id: { type: String, required: true },
    start_time: { type: Date },
    end_time: { type: Date },
}, {
  timestamps: true,
});

const Booking= mongoose.model('Booking', bookingSchema);

module.exports = Booking;