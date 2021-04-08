const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { validatePost, PostModel } = require("../../models/Post");
const { ProfileModel } = require("../../models/Profile");
const { UserModel } = require("../../models/User");

// @route   POST api/posts
// @desc    Create a post
// @access  Private

router.post("/", auth, async (req, res) => {
  const { text, headline } = req.body;
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await UserModel.findOne({ _id: req.user._id }).select(
      "-password"
    );
    let newPost = new PostModel({
      headline,
      text,
      user: user._id,
      name: user.name,
    });
    const post = await newPost.save();
    console.log(post);
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, please try again later");
  }
});

// @route   GET api/posts
// @desc    Get all posts
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    let posts = await PostModel.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, please try again later");
  }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    let post = await PostModel.findOne({ _id: req.params.id });
    if (!post) return res.status(404).send("Post was not found");

    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).send("Post was not found");

    res.status(500).send("Server Error, please try again later");
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a users post by ID
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await PostModel.deleteOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (req.user._id !== post.user)
      return res
        .status(401)
        .send("You are not Autherized to delete other users posts!");
    if (!post) return res.status(404).send("Post was not found");

    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).send("Post was not found");

    res.status(500).send("Server Error, please try again later");
  }
});

// @route   PUT api/posts/apply/:id
// @desc    "Apply" to a post/"wanted add"
// @access  Private

router.put("/apply/:id", auth, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) return res.status(404).send("Post was not found");
    //Check if the post has already been applyed
    if (post.apply.filter((app) => app.user == req.user._id).length > 0) {
      return res.status(400).send("Already applyed to post");
    } else {
      post.apply.unshift({ user: req.user._id });
      await post.save();
      res.json(post.apply);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, please try again later");
  }
});

// @route   PUT api/posts/apply/:id
// @desc    "Unapply" to a post/"wanted add"
// @access  Private

router.put("/unapply/:id", auth, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) return res.status(404).send("Post was not found");
    //Check if the post has already been applyed
    if (post.apply.filter((app) => app.user == req.user._id).length === 0) {
      return res.status(400).send("Did not apply for this post");
    }
    post.apply = post.apply.filter(
      (app) => app.user.toString() !== req.user._id
    );
    await post.save();
    res.json(post.apply);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error, please try again later");
  }
});

module.exports = router;
