import PageHeader from '../../layout/PageHeader';
import Joi from 'joi-browser';
import Form from '../../common/Form';
import { addSkill } from '../../../actions/profilesActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import StarRating from '../../common/StarRating';

class AddSkills extends Form {
  state = {
    data: {
      instrument: '',
      stars: '',
    },

    errors: {},
  };

  setStarValue = (val) => {
    console.log(val);
    this.setState({ data: { ...this.state.data, stars: val } });
  };

  schema = {
    instrument: Joi.string().min(2).max(50).required(),
    stars: Joi.number().max(400).required(),
  };

  doSubmit = async () => {
    const { data } = this.state;
    this.props.addSkill(data, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Add a skill" />
        <div className="row">
          <div className="col-12">
            <p>Fill out the necessary fields:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              <select
                className="form-control"
                name="instrument"
                id="instrument"
                value={this.state.data.instrument}
                onChange={this.handleChange}
              >
                <option value="Guitar">Guitar</option>
                <option value="Drums">Drums</option>
                <option value="Piano">Piano</option>
                <option value="Vocals">Vocals</option>
                <option value="Strings">Strings</option>
                <option value="Percussion">Percussion</option>
                <option value="Synth">Synth</option>
                <option value="Bass">Bass</option>
                <option value="Reeds">Reeds</option>
                <option value="Brass">Brass</option>
                <option value="Other">Other</option>
              </select>

              <StarRating starValue={(val) => this.setStarValue(val)} />
              {this.renderButton('Add Skill')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addSkill })(withRouter(AddSkills));
