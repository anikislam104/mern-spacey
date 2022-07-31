const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentRequestSchema = new Schema({
    host_id: { type: String, required: true },
    renter_id: { type: String, required: true },
    property_id: { type: String, required: true },
    date: { type: Date, required: true },
}, {
  timestamps: true,
});

const RentRequest= mongoose.model('RentRequest', rentRequestSchema);

module.exports = RentRequest;