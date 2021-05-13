import PageHeader from '../../layout/PageHeader';
import Joi from 'joi-browser';
import Form from '../../common/Form';
import { addEducation } from '../../../actions/profilesActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class AddSkills extends Form {
  state = {
    data: {
      school: '',
      degree: '',
      description: '',
    },

    errors: {},
  };

  schema = {
    school: Joi.string().min(2).max(50).required(),
    degree: Joi.string().max(400).allow(''),
    description: Joi.string().min(2).max(50).allow(''),
  };

  doSubmit = async () => {
    const { data } = this.state;
    this.props.addEducation(data, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Add Education" />
        <div className="row">
          <div className="col-12">
            <h3>Fill out the necessary fields, marked by '*':</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput('school', '* School:')}
              {this.renderInput('degree', 'Degree/ certificate:')}
              {this.renderInput('description', 'Description:')}

              {this.renderButton('Add Education')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addEducation })(withRouter(AddSkills));
