const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile',
  },
  userName: {
    type: mongoose.Schema.Types.String,
  },
  headline: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  region: {
    type: String,
  },

  image: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'profile',
  },
  apply: [
    {
      userProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile',
      },
    },
  ],
  paid: {
    type: Boolean,
  },
  date: { type: Date, default: Date.now },
});

const validatePost = (post) => {
  const schema = Joi.object({
    text: Joi.string().min(2).max(400).required(),
    headline: Joi.string().min(2).max(100).required(),
    region: Joi.string().required(),
    paid: Joi.bool().required(),
  });
  return schema.validate(post);
};

const PostModel = mongoose.model('post', postSchema);

exports.PostModel = PostModel;
exports.validatePost = validatePost;
