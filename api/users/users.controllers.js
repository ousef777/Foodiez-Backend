const User = require("../../models/User");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, +process.env.SALTROUNDS);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    console.log('exports.signup -> hashedPassword', hashedPassword);
    const token = generateToken(newUser);
    res.status(201).json({token: token});
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  try {
    const returningUser = await User.findOne({username: req.body.username});
    const token = generateToken(returningUser);
    res.status(200).json({token: token});
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

const generateToken = (user) => {
  let payload = {
    username: user.username,
    _id: user._id,
    exp: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS)
  };
  return jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
}
