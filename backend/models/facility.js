const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const facilitySchema = new Schema({
  propertyId: { type: String, required: true },
  facilityType: { type: String, required: true },
}, {
  timestamps: true,
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;