import Joi from 'joi-browser';
import Form from '../../common/Form';
import { addGenre, getCurrentProfile } from '../../../actions/profilesActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class AddSkills extends Form {
  state = {
    data: {
      genre: '',
    },

    errors: {},
  };

  setStarValue = (val) => {
    console.log(val);
    this.setState({ data: { ...this.state.data, stars: val } });
  };

  schema = {
    genre: Joi.string().min(2).max(50).required(),
  };

  doSubmit = async () => {
    const { data } = this.state;
    await this.props.addGenre(data);
    this.props.getCurrentProfile();
  };

  render() {
    return (
      <form
        className="d-flex mb-3 form"
        onSubmit={this.handleSubmit}
        autoComplete="off"
        method="POST"
      >
        <select
          className="form-control p-0"
          name="genre"
          id="genre"
          value={this.state.data.genre}
          onChange={this.handleChange}
        >
          <option value="Choose">Choose Genre...</option>
          <option value="Rock">Rock</option>
          <option value="Jazz">Jazz</option>
          <option value="Classical">Classical</option>
          <option value="Latin">Latin</option>
          <option value="Funk">Funk</option>
          <option value="Blues">Blues</option>
          <option value="Folk">Folk</option>
          <option value="Metal">Metal</option>
          <option value="Punk">Punk</option>
          <option value="Pop">Pop</option>
        </select>
        <input className="button button-dark" type="submit" value="Add" />
      </form>
    );
  }
}

export default connect(null, { addGenre, getCurrentProfile })(
  withRouter(AddSkills)
);
