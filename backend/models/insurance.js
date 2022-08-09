const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const insuranceSchema = new Schema({
  adderId: { type: String, required: true },
  policy: { type: String, required: true },
  status: { type: String, required: true },
}, {
  timestamps: true,
});

const Insurance = mongoose.model('Insurance', insuranceSchema);

module.exports = Insurance;