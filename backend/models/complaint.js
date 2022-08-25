const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    booking_id: { type: String, required: true },
    property_id: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
}, {
  timestamps: true,
});

const ReviewRating = mongoose.model('ReviewRating', ratingSchema);

module.exports = ReviewRating;