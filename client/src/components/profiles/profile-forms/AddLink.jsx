import PageHeader from '../../layout/PageHeader';
import Joi from 'joi-browser';
import Form from '../../common/Form';
import { addLink } from '../../../actions/profilesActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class AddLink extends Form {
  state = {
    data: {
      title: '',
      link: '',
    },

    errors: {},
  };

  schema = {
    title: Joi.string().min(2).max(50).required(),
    link: Joi.string().min(10).max(1024).required(),
  };

  doSubmit = async () => {
    const { data } = this.state;
    this.props.addLink(data, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Add a Link" />
        <div className="row">
          <div className="col-12">
            <p>Fill out the necessary fields:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput('title', 'Title:')}
              {this.renderInput('link', 'Link:')}

              {this.renderButton('Add Link')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addLink })(withRouter(AddLink));
