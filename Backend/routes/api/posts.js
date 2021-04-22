const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { validatePost, PostModel } = require('../../models/Post');
const { ProfileModel } = require('../../models/Profile');
const { UserModel } = require('../../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Private

router.post('/', auth, async (req, res) => {
  const { text, headline } = req.body;
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await UserModel.findOne({ _id: req.user._id }).select(
      '-password'
    );

    let profile = await ProfileModel.findOne({ user: req.user._id });
    let newPost = new PostModel({
      headline,
      text,
      user: user._id,
      profile: profile._id,
      userName: profile.userName,
      image: profile.image,
    });
    const post = await newPost.save();
    console.log(post);
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error, please try again later');
  }
});

// @route   GET api/posts/applied
// @desc    Get all posts that the user applied to
// @access  Private

router.get('/applied', auth, async (req, res) => {
  console.log('works');
  try {
    let profile = await ProfileModel.findOne({ user: req.user._id });
    let posts = await PostModel.find({ 'apply.userProfile': profile._id });

    // console.log(posts);
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error, please try again later');
  }
});

// @route   GET api/posts
// @desc    Get all posts
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    let posts = await PostModel.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error, please try again later');
  }
});

// @route   GET api/posts/me
// @desc    Get all users posts
// @access  Private

router.get('/me', auth, async (req, res) => {
  try {
    // let profile = await ProfileModel.find({ user: req.user._id });
    let posts = await PostModel.find({ user: req.user._id }).sort({
      date: -1,
    });
    console.log(posts);
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error, please try again later');
  }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private

router.get('/:id', auth, async (req, res) => {
  try {
    let post = await PostModel.findOne({ _id: req.params.id });
    if (!post) return res.status(404).send('Post was not found');
    console.log(post);
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).send('Post was not found');

    res.status(500).send('Server Error, please try again later');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a users post by ID
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let post = await PostModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    console.log({ userID: req.user._id, postUser: post.user }, post);
    if (req.user._id !== post.user.toString())
      return res
        .status(401)
        .send('You are not Autherized to delete other users posts!');
    if (!post) return res.status(404).send('Post was not found');
    post = await PostModel.deleteOne({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).send('Post was not found');

    res.status(500).send('Server Error, please try again later');
  }
});

// @route   PUT api/posts/apply/:id
// @desc    "Apply" to a post/"wanted add"
// @access  Private

router.put('/apply/:id', auth, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user._id });
    const post = await PostModel.findById(req.params.id);
    if (!post) return res.status(404).send('Post was not found');
    //Check if the post has already been applyed
    if (
      post.apply.filter(
        (app) => app.userProfile.toString() === profile._id.toString()
      ).length > 0
    ) {
      return res.status(400).send('Already applyed to post');
    } else {
      post.apply.unshift({ userProfile: profile._id });
      await post.save();
      res.json(post.apply);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error, please try again later');
  }
});

// @route   PUT api/posts/apply/:id
// @desc    "Unapply" to a post/"wanted add"
// @access  Private

router.put('/unapply/:id', auth, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user._id });

    const post = await PostModel.findById(req.params.id);
    console.log(post);
    if (!post) return res.status(404).send('Post was not found');
    //Check if the post has already been applyed
    if (
      post.apply.filter(
        (app) => app.userProfile.toString() === profile._id.toString()
      ).length === 0
    ) {
      return res.status(400).send('Did not apply for this post');
    }
    post.apply = post.apply.filter(
      (app) => app.userProfile.toString() !== profile._id.toString()
    );
    await post.save();
    res.json(post.apply);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error, please try again later');
  }
});

module.exports = router;
