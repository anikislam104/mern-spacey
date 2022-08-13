const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pastBookingSchema = new Schema({
    host_id: { type: String, required: true },
    renter_id: { type: String, required: true },
    property_id: { type: String, required: true },
    booking_id: { type: String, required: true },
    start_time: { type: Date },
    end_time: { type: Date },
    price: { type: String ,default:0},
}, {
  timestamps: true,
});

const PastBooking= mongoose.model('PastBooking', pastBookingSchema);

module.exports = PastBooking;