const express = require('express');
const passport = require('passport');
const router = express.Router();
 const upload = require('../media/uploadConfig');
const { signup, signin, getUsers,uploadProfileImage } = require('./users.controllers');

router.post('/signup', signup);
router.post('/signin', passport.authenticate('local', { session: false }), signin);
router.get('/users', getUsers);
router.post('/uploadProfileImage', upload.single('image'),uploadProfileImage);
module.exports = router;
