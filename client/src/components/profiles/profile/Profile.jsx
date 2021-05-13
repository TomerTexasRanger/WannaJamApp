import PropTypes from 'prop-types';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Link to="/profiles" className="button button-primary">
            Back To Profiles
          </Link>
          <PageHeader titleText={'Profile page'} />
          <div className="profile-grid my-1">
            <TopLeft profile={profile} user={user} />
            <div className="profile-right  p-2">
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

Profile.prototype = {
  getProfileById: PropTypes.func,
  profile: PropTypes.object,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilesReducer,
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, { getProfileById })(Profile);
