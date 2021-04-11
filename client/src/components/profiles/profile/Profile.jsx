import { connect } from "react-redux";
import { useEffect } from "react";
import Loader from "react-loader-spinner";
import { getProfileById } from "../../../actions/profilesActions";
import { Link } from "react-router-dom";
import PageHeader from "../../layout/PageHeader";

const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, []);
  return (
    <>
      {profile === null || loading ? (
        <Loader />
      ) : (
        <div className="container">
          <PageHeader titleText={profile.userName} />
          <Link to="/profiles" className="btn btn-success">
            Back to Profiles
          </Link>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilesReducer,
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, { getProfileById })(Profile);
