const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentRequestSchema = new Schema({
    host_id: { type: String, required: true },
    renter_id: { type: String, required: true },
    renter_name: { type: String, required: true },
    property_id: { type: String, required: true },
    property_title: { type: String, required: true },
    start_date: { type: Date },
    end_date: { type: Date },
}, {
  timestamps: true,
});

const RentRequest= mongoose.model('RentRequest', rentRequestSchema);

module.exports = RentRequest;