const express = require("express");
const router = express.Router();
const _ = require("lodash");
const {
  ProfileModel,
  validateProfile,
  validateEducation,
  validateSkills,
} = require("../../models/Profile");
const auth = require("../../middleware/auth");
const { UserModel } = require("../../models/User");

// @route   POST api/profile
// @desc    Create a profile
// @access  Private

router.post("/", auth, async (req, res) => {
  const { error } = validateProfile(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let profile = new ProfileModel({
    ...req.body,
    user: req.user._id,
  });
  try {
    post = await profile.save();
    //Attach new profile to the user's "profiles" array
    // let user = await UserModel.findById(req.user._id);
    // user.profiles.push(post);
    // await user.save();
    res.send(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private

router.get("/me", auth, async (req, res) => {
  try {
    let profile = await ProfileModel.findOne({
      user: req.user._id,
    }).populate("user", ["name"]);
    if (!profile) return res.status(400).send("User has no profiles");

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, Please try again later");
  }
});

// @route   PUT api/profile/id
// @desc    Update current users profile
// @access  Private

router.put("/", auth, async (req, res) => {
  const { error } = validateProfile(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let profile = await ProfileModel.updateOne(
      {
        user: req.user._id,
      },
      req.body
    );
    if (!profile) return res.status(404).send("Profile not found");

    profile = await ProfileModel.findOne({
      user: req.user._id,
    });
    res.send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, Please try again later");
  }
});

// @route   DELETE api/profile/id
// @desc    Delete a profile by ID
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const profile = await ProfileModel.deleteOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!profile) return res.status(404).send("Profile not found");

    res.send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, please try again later");
  }
});

// @route   GET api/profile/id
// @desc    Get a profile by ID
// @access  Private

router.get("/:id", auth, async (req, res) => {
  const theId = req.params.id;
  try {
    let profile = await ProfileModel.findOne({ _id: theId });
    if (!profile) return res.status(400).send("Profile not found");

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, Please try again later");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile/s by user ID
// @access  Private
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.params.user_id });
    if (!user) return res.status(400).json({ msg: "User not found" });

    res.send(user.profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, please try again later");
  }
});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    let profiles = await ProfileModel.find();
    if (!profiles) return res.status(404).send("No profiles found");

    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, please try again later");
  }
});

// @route   PUT api/profile/education
// @desc    Add to "education" array
// @access  Private

router.put("/education", auth, async (req, res) => {
  const { error } = validateEducation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let profile = await ProfileModel.findOne({
      user: req.user._id,
    });
    if (!profile) return res.status(404).send("Profile not found");

    profile.education.unshift(req.body);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, please try again later");
  }
});

// @route   PUT api/skills
// @desc    Add to "skills" array
// @access  Private

router.put("/skills", auth, async (req, res) => {
  const { error } = validateSkills(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let profile = await ProfileModel.findOne({
      user: req.user._id,
    });
    if (!profile) return res.status(404).send("Profile not found");

    profile.skills.unshift(req.body);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, please try again later");
  }
});

// @route   PUT api/education/edu_id
// @desc    Delete an education by edu_id
// @access  Private
router.put("/education/:edu_id", auth, async (req, res) => {
  const { edu_id } = req.params;

  try {
    let profile = await ProfileModel.findOne({ user: req.user._id });
    if (!profile) return res.status(404).send("Profile not found");

    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== edu_id
    );
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, please try again later");
  }
});

// @route   PUT api/skills/skill_id
// @desc    Delete a skill by skill_id
// @access  Private

router.put("/skills/:skill_id", auth, async (req, res) => {
  const { skill_id } = req.params;

  try {
    let profile = await ProfileModel.findOne({ user: req.user._id });
    if (!profile) return res.status(404).send("Profile not found");

    profile.skills = profile.skills.filter(
      (skill) => skill._id.toString() !== skill_id
    );
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, please try again later");
  }
});

module.exports = router;
