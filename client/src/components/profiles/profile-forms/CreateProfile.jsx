import PageHeader from '../../layout/PageHeader';
import Joi from 'joi-browser';
import Form from '../../common/Form';
import { createProfile } from '../../../actions/profilesActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class CreateProfile extends Form {
  state = {
    data: {
      userName: '',
      email: '',
      bio: '',
      location: '',
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
    age: Joi.number().allow(''),
    location: Joi.string().min(2).max(200).required(),
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

    this.props.createProfile(data, this.props.history);
  };

  render() {
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
              {this.renderInput('age', 'User Age:', '', 'number')}
              {this.renderInput('bio', 'Bio:')}
              {this.renderInput('location', '* Location:')}
              {this.renderInput('phone', '* Phone:')}
              {this.renderInput(
                'image',
                'Image:',
                '',
                'file',
                'form-control-file'
              )}
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
