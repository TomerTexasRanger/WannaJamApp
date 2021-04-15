import PageHeader from '../../components/layout/PageHeader';
import Joi from 'joi-browser';
import Form from '../../components/common/Form';
import { addPost } from '../../actions/postsActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class AddPost extends Form {
  state = {
    data: {
      headline: '',
      text: '',
    },

    errors: {},
  };

  schema = {
    headline: Joi.string().min(2).max(100).required(),
    text: Joi.string().min(10).max(1024).required(),
  };

  doSubmit = async () => {
    const { data } = this.state;
    this.props.addPost(data, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Create an Add" />
        <div className="row">
          <div className="col-12">
            <p>Fill out the necessary fields:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput('headline', 'Headline:')}
              {this.renderInput('text', 'Text:', '')}

              {this.renderButton('Publish Add')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addPost })(withRouter(AddPost));
