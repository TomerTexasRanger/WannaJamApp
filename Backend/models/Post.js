const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  headline: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  name: {
    type: String,
  },
  apply: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  date: { type: Date, default: Date.now },
});

const validatePost = (post) => {
  const schema = Joi.object({
    text: Joi.string().min(2).max(400).required(),
    headline: Joi.string().min(2).max(50).required(),
  });
  return schema.validate(post);
};

const PostModel = mongoose.model("post", postSchema);

exports.PostModel = PostModel;
exports.validatePost = validatePost;
