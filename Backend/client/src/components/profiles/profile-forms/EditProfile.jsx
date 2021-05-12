import PageHeader from '../../layout/PageHeader';
import Joi from 'joi-browser';
import Form from '../../common/Form';
import {
  updateProfile,
  getCurrentProfile,
} from '../../../actions/profilesActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class EditProfile extends Form {
  state = {
    data: {
      userName: '',
      bio: '',
      location: '',
      licensed: false,
      age: '',
      phone: '',
      image: '',
      experience: '',

      youtube: '',
      facebook: '',
      instagram: '',
    },

    errors: {},
  };

  componentDidMount() {
    const { loading, profile } = this.props.profile;
    this.setState({
      data: {
        userName: loading || !profile.userName ? '' : profile.userName,
        bio: loading || !profile.bio ? '' : profile.bio,
        location: loading || !profile.location ? '' : profile.location,
        region: loading ? '' : profile.region,
        age: loading || !profile.age ? '' : profile.age,
        licensed: !loading && profile.licensed,
        phone: loading || !profile.phone ? '' : profile.phone,
        image: loading || !profile.image ? '' : profile.image,
        experience: loading || !profile.experience ? '' : profile.experience,

        youtube: loading || !profile.youtube ? '' : profile.youtube,
        facebook: loading || !profile.facebook ? '' : profile.facebook,
        instagram: loading || !profile.instagram ? '' : profile.instagram,
      },
    });
  }

  schema = {
    userName: Joi.string().min(2).max(50).required(),
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

    this.props.updateProfile(data, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Edit Your Profile:" />
        <div className="row">
          <div className="col-12">
            <h3>Fill out the necessary fields, marked by '*':</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form
              className="form"
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
            >
              {this.renderInput('userName', '* User Name:')}
              {this.renderInput('age', '* Birth Date:', '', 'date')}
              <label htmlFor="bio" className="t-lead">
                Bio
              </label>
              <textarea
                className="font-control"
                name="bio"
                id="bio"
                cols="30"
                rows="2"
                onChange={this.handleChange}
              ></textarea>
              {this.renderInput('location', '* Location:')}
              <label htmlFor="region">Region: </label>
              <select
                name="region"
                id="region"
                className=" form-control"
                value={this.state.data.region}
                onChange={this.handleChange}
              >
                <option value="north">North</option>
                <option value="center">Center</option>
                <option value="south">South</option>
                <option value="other">Other</option>
              </select>
              {this.renderInput('phone', '* Phone:')}
              <label htmlFor="experience" className="t-lead">
                Experience
              </label>
              <textarea
                className="font-control"
                name="experience"
                id="experience"
                cols="30"
                rows="2"
                onChange={this.handleChange}
              ></textarea>
              {this.renderInput(
                'licensed',
                'Licensed?:',
                '',
                'checkbox',
                'form-check-input ml-3  '
              )}
              {this.renderInput('youtube', 'YouTube', 'fab fa-youtube')}
              {this.renderInput('facebook', 'Facebook', 'fab fa-facebook')}
              {this.renderInput('instagram', 'Instagram', 'fab fa-instagram')}
              {this.renderButton('Update Profile')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilesReducer,
  };
};

export default connect(mapStateToProps, { updateProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
