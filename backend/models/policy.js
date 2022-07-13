const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const policySchema = new Schema({
  policyId: { type: Number, required: true },
  compenstaion: { type: Number, required: true},
  duration: {type: Number, required: true},
}, {
  timestamps: true,
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;