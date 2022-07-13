const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const insuranceSchema = new Schema({
  insuranceId: { type: Number, required: true },
  policyId: { type: Number, required: true },
}, {
  timestamps: true,
});

const Insurance = mongoose.model('Insurance', insuranceSchema);

module.exports = Insurance;