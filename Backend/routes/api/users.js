const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { UserModel, validate } = require("../../models/User");
const auth = require("../../middleware/auth");

// @route   POST api/users
// @desc    Register A User
// @access  Public
router.post("/", async (req, res) => {
  const { email } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await UserModel.findOne({ email });
    if (user) return res.status(400).send("User already registered");

    user = new UserModel(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/me
// @desc    Get the user's information (token required)
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
