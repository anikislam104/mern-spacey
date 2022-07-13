const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomId: { type: Number, required: true },
  propertyId: { type: Number, required: true },
  roomNo: { type: Number, required: true },
}, {
  timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;