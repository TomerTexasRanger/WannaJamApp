import { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../actions/profilesActions";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import PageHeader from "../../layout/PageHeader";
import Skill from "./Skill";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Loader
      type="Audio"
      height={300}
      width={300}
      className="d-flex justify-content-center mt-5"
    />
  ) : (
    <div className="container">
      <PageHeader titleText={"Dashbord"} />
      <i className="fas fa-user"></i> Welcome {user && user.name}
      {profile !== null ? (
        <>
          <Link className="btn btn-success mr-3" to="/edit-profile">
            Edit Profile
          </Link>
          <Link className="btn btn-secondary" to="/add-skills">
            Add skills
          </Link>
          <Link className="btn btn-secondary ml-3" to="/add-education">
            Add Education
          </Link>
        </>
      ) : (
        <>
          <p>Wanna jam?, show us what you got by creating a profile</p>
          <Link to="/create-profile" className="btn btn-primary">
            Create a profile
          </Link>
          <br />
          <i>
            You cannot send or recieve messages, and you cannot apply for adds
            without a profile{" "}
          </i>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilesReducer,
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
