import { connect } from 'react-redux';
import { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { getProfileById } from '../../../actions/profilesActions';
import { Link } from 'react-router-dom';
import PageHeader from '../../layout/PageHeader';
import TopLeft from './TopLeft';
import TopRight from './TopRight';
import Bottom from './Bottom';
import Links from './Links';

const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, []);
  return (
    <>
      {profile === null || loading ? (
        <Loader
          type="Audio"
          height={300}
          width={300}
          className="d-flex justify-content-center mt-5"
        />
      ) : (
        <div className="container">
          <Link to="/profiles" className="btn btn-primary">
            Back To Profiles
          </Link>
          <PageHeader titleText={'Profile page'} />
          <div className="profile-grid my-1">
            <TopLeft profile={profile} user={user} />
            <div className="profile-right bg-light p-2">
              <TopRight profile={profile} user={user} />
            </div>
            <Bottom profile={profile} user={user} />
            <Links profile={profile} user={user} />
          </div>
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
