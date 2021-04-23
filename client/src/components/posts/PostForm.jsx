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
      region: '',
      paid: false,
    },

    errors: {},
  };

  schema = {
    headline: Joi.string().min(2).max(100).required(),
    text: Joi.string().min(10).max(1024).required(),
    region: Joi.string().min(1).max(20).required(),
    paid: Joi.bool().required(),
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
              {/* {this.renderInput('text', 'Text:', '')} */}
              <label htmlFor="text">Text:</label>
              <textarea
                className="form-control"
                onChange={() => this.handleChange}
                name="text"
                id="text"
                cols="30"
                rows="5"
                placeholder="(Will be hidden in the posts page)"
              ></textarea>
              <label htmlFor="region">Region: </label>
              <select
                name="region"
                id="region"
                className="ml-2 form-control "
                value={this.state.data.region}
                onChange={this.handleChange}
              >
                <option value="north">Select region</option>
                <option value="North">North</option>
                <option value="Center">Center</option>
                <option value="South">South</option>
                <option value="Other">Other</option>
              </select>
              {this.renderInput(
                'paid',
                'Paid?:',
                '',
                'checkbox',
                'form-check-input ml-3 '
              )}
              {this.renderButton('Publish Add')}
            </form>
          </div>
        </div>
        <div className="line"></div>
      </div>
    );
  }
}

export default connect(null, { addPost })(withRouter(AddPost));
