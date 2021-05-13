const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../../models/User");
const Joi = require("@hapi/joi");

// @route   POST api/auth
// @desc    Login user and get token
// @access  Public

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const { errors } = validateLogin(req.body);
  if (errors) return res.status(400).send(errors.details[0].message);
  try {
    let user = await UserModel.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");

    let validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    res.json({ token: user.generateAuthToken() });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(req);
};

module.exports = router;
