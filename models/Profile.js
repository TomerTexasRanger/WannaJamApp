const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  userName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    require: true,
  },
  email: {
    type: String,
    minlength: 5,
  },
  age: {
    type: Number,
  },
  location: {
    type: String,
  },
  genres: [
    {
      genre: {
        type: String,
      },
    },
  ],
  region: {
    type: String,
  },
  licensed: {
    type: Boolean,
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

  youtube: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  links: [
    {
      title: { type: String },
      link: { type: String },
    },
  ],
  applied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
});
const ProfileModel = mongoose.model('profile', profileSchema);

const validateProfile = (profile) => {
  const schema = Joi.object({
    userName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(50).allow(''),
    age: Joi.number(),
    location: Joi.string().min(2).max(200).required(),
    region: Joi.string().required(),
    genre: Joi.string(),
    licensed: Joi.bool().required(),
    image: Joi.string().max(1024).allow(''),
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
    bio: Joi.string().min(1).max(400).allow(''),
    experience: Joi.string().min(1).max(400).allow(''),
    education: Joi.array().items(
      Joi.object({
        school: Joi.string().required(),
        degree: Joi.string(),
        description: Joi.string(),
      })
    ),
    youtube: Joi.string().max(400).allow(''),
    facebook: Joi.string().max(400).allow(''),
    instagram: Joi.string().max(400).allow(''),

    links: Joi.array().items(Joi.string()),
  });
  return schema.validate(profile);
};

const validateEducation = (edu) => {
  const schema = Joi.object({
    school: Joi.string().min(2).max(50).required(),
    degree: Joi.string().min(2).max(50).allow(''),
    description: Joi.string().max(200).allow(''),
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

const validateLinks = (link) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    link: Joi.string().min(10).max(1024),
  });
  return schema.validate(link);
};

const validateGenres = (genre) => {
  const schema = Joi.object({
    genre: Joi.string().min(2).max(50),
  });
  return schema.validate(genre);
};

exports.ProfileModel = ProfileModel;
exports.validateProfile = validateProfile;
exports.validateEducation = validateEducation;
exports.validateSkills = validateSkills;
exports.validateLinks = validateLinks;
exports.validateGenres = validateGenres;
