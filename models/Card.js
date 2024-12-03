const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({ name: { type: String, required: true, }, amount: { type: String, required: true, }, });

module.exports = mongoose.model('Card', CardSchema);