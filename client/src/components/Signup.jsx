import PageHeader from './layout/PageHeader';
import Joi from 'joi-browser';
import Form from './common/Form';
import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { Redirect } from 'react-router-dom';

class Signup extends Form {
  state = {
    data: { email: '', password: '', name: '' },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(6).label('Password'),
    name: Joi.string().required().min(2).label('Name'),
  };

  doSubmit = async () => {
    const { data } = this.state;

    const res = await this.props.register(data);

    res && this.props.history.replace('/signin');
  };
  render() {
    if (this.props.isAuthenticated === true) return <Redirect to="/" />;

    return (
      <div className="container">
        <PageHeader titleText="Sign Up for WannaJam" />
        <div className="row">
          <div className="col-12">
            <h3>You can open new account for free!</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput('email', 'Email', 'email')}
              {this.renderInput('password', 'Password', '', 'password')}
              {this.renderInput('name', 'Name')}
              {this.renderButton('Signup')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Signup);
