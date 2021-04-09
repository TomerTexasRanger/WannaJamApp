import React from "react";
import PageHeader from "./layout/PageHeader";
import Joi from "joi-browser";
import Form from "./common/Form";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import { getCurrentUser } from "../actions/userActions";
class Signin extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;

    const res = await this.props.login(email, password);

    res
      ? this.props.history.replace("/")
      : this.setState({ data: { password: "" } });

    //(window.location = "/")
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Signin to WannaJam" />
        <div className="row">
          <div className="col-12">
            <p>You can signin here with your account!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Signin")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { login })(Signin);
