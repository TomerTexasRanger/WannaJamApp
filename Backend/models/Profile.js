const Joi = require("@hapi/joi");
const { max } = require("lodash");
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  userName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    require: true,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  image: {
    type: String,

    maxlength: 1024,
  },
  skills: [
    {
      instrument: {
        type: String,
        required: true,
      },
      stars: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
    },
  ],

  bio: {
    type: String,
  },
  experience: {
    type: String,
  },
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  links: [
    {
      type: String,
    },
  ],
});
const ProfileModel = mongoose.model("profile", profileSchema);

const validateProfile = (profile) => {
  const schema = Joi.object({
    userName: Joi.string().min(2).max(50).required(),
    location: Joi.string().min(2).max(200).required(),
    image: Joi.string().max(1024),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    skills: Joi.array().items(
      Joi.object({
        instrument: Joi.string().required(),
        stars: Joi.number().min(1).max(5).required(),
      })
    ),
    bio: Joi.string().min(1).max(400),
    experience: Joi.string().min(1).max(400),
    education: Joi.array().items(
      Joi.object({
        school: Joi.string().required(),
        degree: Joi.string(),
        description: Joi.string(),
      })
    ),
    social: Joi.object(),
    links: Joi.array().items(Joi.string()),
  });
  return schema.validate(profile);
};

const validateEducation = (edu) => {
  const schema = Joi.object({
    school: Joi.string().min(2).max(50).required(),
    degree: Joi.string().min(2).max(50),
    description: Joi.string().max(200),
  });
  return schema.validate(edu);
};

const validateSkills = (skill) => {
  const schema = Joi.object({
    instrument: Joi.string().min(2).max(50).required(),
    stars: Joi.number().min(1).max(5),
  });
  return schema.validate(skill);
};

exports.ProfileModel = ProfileModel;
exports.validateProfile = validateProfile;
exports.validateEducation = validateEducation;
exports.validateSkills = validateSkills;
