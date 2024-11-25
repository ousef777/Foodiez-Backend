const User = require("../../models/User");
const Recipe = require('../../models/Recipe');

exports.createRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, category } = req.body;
    req.body.userId = req.user._id;
    if (!ingredients) {
      return res.status(400).json({ message: 'Ingredients are required.' }); //400 Bad Request
    }

    const newRecipe = await Recipe.create(req.body);
    res.status(201).json({ message: 'Recipe created successfully!', recipe: newRecipe }); // 201 successfully created
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message }); //500 error in server 
    next(err);
  }
};

exports.getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate('userId', 'username');
    res.status(200).json(recipes); // 200 everything ok
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });//500 error in server
    next(err);
  }
};

exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('userId', 'username');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });// 404 not found 
    }
    res.status(200).json(recipe); // 200 everything ok
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });//500 error in server
    next(err);
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    const getRecipe = await Recipe.findById(req.params.id);
    if (!getRecipe) {
      return res.status(404).json({ message: 'Recipe not found.' }); ///404 not found 
    }
    if (getRecipe.userId.toJSON() !== req.user.id)
        return res.status(401).json({ message: 'Unauthorized user' });
    
    const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
    res.status(200).json({ message: 'Recipe updated successfully!', recipe: updatedRecipe }); // 200 everything ok
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message }); //500 error in server
    next(err);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    const getRecipe = await Recipe.findById(req.params.id);
    if (!getRecipe) {
      return res.status(404).json({ message: 'Recipe not found.' });//404 not found 
    }
    if (getRecipe.userId.toJSON() !== req.user.id)
        return res.status(401).json({ message: 'Unauthorized user' });

    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Recipe deleted successfully!' });// 200 ok 
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message }); //500 error in server
    next(err);
  }
};
