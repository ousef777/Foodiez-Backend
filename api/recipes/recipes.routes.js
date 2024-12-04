const express = require('express');
const passport = require('passport');
const router = express.Router();

const { 
    createRecipe, 
    getRecipes, 
    getRecipeById,
    updateRecipe,
    deleteRecipe,
} = require('./recipes.controllers');
const upload = require("../../multer");
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), createRecipe);

router.get('/', getRecipes);

router.get('/:id', getRecipeById);

router.put('/:id', passport.authenticate('jwt', { session: false }), updateRecipe);

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteRecipe);

module.exports = router;
