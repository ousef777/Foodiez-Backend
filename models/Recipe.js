const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: String,
  author: String,
  ingredients: [
    {
        type: String,
    },
  ]
});

module.exports = mongoose.model('Recipe', RecipeSchema);