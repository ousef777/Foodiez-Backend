const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  ingredients: [
    {
        type: String,
        required: true
    },
  ],
  description: String,
  category: {type: String, required: true},
  image: String,
  steps: [
    {
        type: String,
    },
  ],
});

module.exports = mongoose.model('Recipe', RecipeSchema);