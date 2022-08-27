const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    booking_id: { type: String, required: true },
    complainant_id: { type: String, required: true },
    complainee_id: { type: String, required: true },
    complaint: { type: String, required: true }, 
    date: { type: Date,default: new Date() },
}, {
  timestamps: true,
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;