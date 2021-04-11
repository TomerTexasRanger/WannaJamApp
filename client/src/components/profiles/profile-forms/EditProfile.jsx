import PageHeader from "../../layout/PageHeader";
import Joi from "joi-browser";
import Form from "../../common/Form";
import {
  updateProfile,
  getCurrentProfile,
} from "../../../actions/profilesActions";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class EditProfile extends Form {
  state = {
    data: {
      userName: "",
      bio: "",
      location: "",
      phone: "",
      image: "",
      experience: "",
      social: {
        youtube: "",
        facebook: "",
        instagram: "",
      },
    },

    errors: {},
  };

  componentDidMount() {
    const { loading, profile } = this.props.profile;
    this.setState({
      data: {
        userName: loading || !profile.userName ? "" : profile.userName,
        bio: loading || !profile.bio ? "" : profile.bio,
        location: loading || !profile.location ? "" : profile.location,
        phone: loading || !profile.phone ? "" : profile.phone,
        image: loading || !profile.image ? "" : profile.image,
        experience: loading || !profile.experience ? "" : profile.experience,
        social: {
          youtube: loading || !profile.social ? "" : profile.social.youtube,
          facebook: loading || !profile.social ? "" : profile.social.facebook,
          instagram: loading || !profile.social ? "" : profile.social.instagram,
        },
      },
    });
  }

  schema = {
    userName: Joi.string().min(2).max(50).required(),
    bio: Joi.string().max(400).allow(""),
    location: Joi.string().min(2).max(200).required(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    image: Joi.string().min(11).max(1024).uri().allow(""),
    experience: Joi.string().min(1).max(400).allow(""),
    social: Joi.object(),
    youtube: Joi.string().max(400).allow(""),
    facebook: Joi.string().max(400).allow(""),
    instagram: Joi.string().max(400).allow(""),
  };

  doSubmit = async () => {
    const { data } = this.state;
    this.props.updateProfile(data, this.props.history);
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
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("userName", "* User Name:")}
              {this.renderInput("bio", "Bio:")}
              {this.renderInput("location", "* Location:")}
              {this.renderInput("phone", "* Phone:")}
              {this.renderInput("image", "Image:")}
              {this.renderInput("experience", "Experience:")}
              {this.renderInput("youtube", "YouTube", "fab fa-youtube")}
              {this.renderInput("facebook", "Facebook", "fab fa-facebook")}
              {this.renderInput("instagram", "Instagram", "fab fa-instagram")}
              {this.renderButton("Update Profile")}
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
