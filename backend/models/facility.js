const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const facilitySchema = new Schema({
  facilityId: { type: Number, required: true },
  propertyId: { type: Number, required: true },
}, {
  timestamps: true,
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;