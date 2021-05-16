import React from 'react';
import PageHeader from './layout/PageHeader';
import Joi from 'joi-browser';
import Form from './common/Form';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { Redirect, Link } from 'react-router-dom';
class Signin extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(6).label('Password'),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;

    const res = await this.props.login(email, password);

    res
      ? this.props.history.replace('/')
      : this.setState({ data: { password: '' } });
  };

  render() {
    if (this.props.isAuthenticated === true) return <Redirect to="/" />;

    return (
      <div className="container">
        <PageHeader titleText="Sign in to WannaJam" />
        <div className="row">
          <div className="col-12">
            <h3>Fill your name and password to access your account...</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput('email', 'Email', 'email')}
              {this.renderInput('password', 'Password', '', 'password')}
              {this.renderButton('Signin')}
            </form>
          </div>
        </div>
        <h3 className="mt-5">Dont have an account?</h3>
        <p className="t-lead">
          Click here to <Link to="/signup">Sign Up</Link>{' '}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Signin);
