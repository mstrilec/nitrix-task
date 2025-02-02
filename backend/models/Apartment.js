const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 90 },
  description: { type: String, required: true, maxlength: 335 },
  price: { type: Number, required: true },
  rooms: { type: Number, required: true, enum: [1, 2, 3] },
  images: [{ type: String }],
});

module.exports = mongoose.model('Apartment', apartmentSchema);