import PageHeader from "./layout/PageHeader";
import Joi from "joi-browser";
import Form from "./common/Form";
import axios from "axios";
import { toast } from "react-toastify";

class Signup extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  doSubmit = async () => {
    const { data } = this.state;

    try {
      await axios.post(`/api/users`, data);
      toast("User Registered Successfully!");
      this.props.history.replace("/signin");
    } catch (ex) {
      console.log(ex.response);
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: "Email is taken" } });
      }
    }
  };
  render() {
    return (
      <div className="container">
        <PageHeader titleText="Signup for WannaJam" />
        <div className="row">
          <div className="col-12">
            <p>You can open new account for free!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}
              {this.renderButton("Signup")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
