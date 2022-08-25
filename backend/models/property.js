const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propertySchema = new Schema({
  hostId: { type: String, required: true },
  title: {type: String, required: true},
  location: { type: String, required: true },
  description: { type: String, required: true },
  size: { type: Number, required: true },
  status: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  image: { type: String },
}, {
  timestamps: true,
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;