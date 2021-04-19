import PageHeader from '../../layout/PageHeader';
import Joi from 'joi-browser';
import Form from '../../common/Form';
import { createProfile } from '../../../actions/profilesActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

class CreateProfile extends Form {
  state = {
    data: {
      userName: '',
      email: '',
      bio: '',
      location: '',
      region: '',
      phone: '',
      licensed: false,
      age: '',
      image: '',
      experience: '',

      youtube: '',
      facebook: '',
      instagram: '',
    },

    errors: {},
  };
  schema = {
    userName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).email().allow(''),
    bio: Joi.string().max(400).allow(''),
    licensed: Joi.bool().required(),
    age: Joi.date().allow(''),
    location: Joi.string().min(2).max(200).required(),
    region: Joi.string(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    image: Joi.string().min(11).max(1024).allow(''),
    experience: Joi.string().min(1).max(400).allow(''),
    youtube: Joi.string().max(400).allow(''),
    facebook: Joi.string().max(400).allow(''),
    instagram: Joi.string().max(400).allow(''),
  };

  doSubmit = async () => {
    const { data } = this.state;
    let birth = Date.parse(data.age);
    let now = Date.now();
    let theAge = now - birth;
    let hour = 3600000;
    let day = hour * 24;
    let year = day * 365;
    theAge = Math.round(theAge / year);
    data.age = theAge;
    this.props.createProfile(data, this.props.history);
  };

  render() {
    console.log(this.state.data);
    return (
      <div className="container">
        <PageHeader titleText="Create Your Profile:" />
        <div className="row">
          <div className="col-12">
            <p>Fill out the necessary fields:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form
              onSubmit={this.handleSubmit}
              encType="multipart/form-data"
              autoComplete="off"
              method="POST"
            >
              {this.renderInput('userName', '* User Name:')}
              {this.renderInput('email', 'Email:')}
              {this.renderInput('age', 'Date of birth:', '', 'date')}
              {this.renderInput('bio', 'Bio:')}
              {this.renderInput('location', '* Location:')}
              <label htmlFor="region">Region: </label>
              <select
                name="region"
                id="region"
                className="ml-2"
                value={this.state.data.region}
                onChange={this.handleChange}
              >
                <option value="north">North</option>
                <option value="center">Center</option>
                <option value="south">South</option>
                <option value="other">Other</option>
              </select>
              {this.renderInput('phone', '* Phone:')}
              {this.renderInput('experience', 'Experience:')}
              {this.renderInput(
                'licensed',
                'Licensed?:',
                '',
                'checkbox',
                'form-check-input ml-3 '
              )}
              {this.renderInput('youtube', 'YouTube', 'fab fa-youtube')}
              {this.renderInput('facebook', 'Facebook', 'fab fa-facebook')}
              {this.renderInput('instagram', 'Instagram', 'fab fa-instagram')}
              {this.renderButton('Create Profile')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createProfile })(withRouter(CreateProfile));
