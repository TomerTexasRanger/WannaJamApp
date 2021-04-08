const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/default.json");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  createdAt: { type: Date, default: Date.now },
  profiles: Array,
});
//TO DO change experation on token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, jwtKey["JWT-KEY"], {
    expiresIn: 360000,
  });
  return token;
};

const UserModel = mongoose.model("user", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(user);
};

function validateProfiles(data) {
  const schema = Joi.object({
    cards: Joi.array().min(1).required(),
  });

  return schema.validate(data);
}

exports.UserModel = UserModel;
exports.validate = validateUser;
exports.validateProfiles = validateProfiles;
