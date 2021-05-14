import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteUser } from '../../../actions/authActions';
import { Link } from 'react-router-dom';
import {
  getCurrentProfile,
  removeSkill,
  removeLink,
  deleteProfile,
} from '../../../actions/profilesActions';
import Loader from 'react-loader-spinner';
import PageHeader from '../../layout/PageHeader';
import TopLeft from './TopLeft';
import TopRight from './TopRight';
import Bottom from './Bottom';
import Links from './Links';
import ProfilePostManger from './ProfilePostManger';
import Moment from 'react-moment';

const Dashboard = ({
  deleteProfile,
  deleteUser,
  removeLink,
  removeSkill,
  getCurrentProfile,
  auth: { user, date },
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loading && profile === null ? (
    <Loader
      type="Audio"
      height={300}
      width={300}
      className="d-flex justify-content-center mt-5"
    />
  ) : (
    <div className="container ">
      <PageHeader titleText={'Dashbord'} />

      <h3 className=""> Welcome {user && user.name}</h3>
      <h4>
        Joined : <Moment format="DD/MM/YYYY">{date}</Moment>
      </h4>
      <i className="fas fa-user"></i>
      <button
        className="button button-danger mt-0 mb-5"
        onClick={() =>
          window.confirm(
            'Are you sure you want to delete your user and profile?'
          ) && deleteUser()
        }
      >
        Delete User
      </button>
      {profile !== null ? (
        <>
          <div className="d-flex justify-content-end">
            <Link className="button button-light mr-0 " to="/edit-profile">
              Edit Profile
            </Link>
            <button
              onClick={() =>
                window.confirm(
                  'Are you Sure you want to delete your profile?'
                ) && deleteProfile()
              }
              className="button button-danger ml-2 mr-0 "
              to="/edit-profile"
            >
              Delete Profile
            </button>
          </div>

          <div className="profile-grid dashboard-profile my-1">
            <TopLeft profile={profile} user={user} />
            <div className="profile-right  p-2">
              <TopRight
                profile={profile}
                user={user}
                loading={loading}
                removeSkill={removeSkill}
              />
            </div>
            <Bottom profile={profile} user={user} loading={loading} />

            <Links
              profile={profile}
              user={user}
              loading={loading}
              removeLink={removeLink}
            />
          </div>
          <ProfilePostManger />
        </>
      ) : (
        <>
          <h3 className="mt-5 mb-5">
            Wanna jam?, show us what you got by creating a profile
          </h3>
          <Link to="/create-profile" className="button button-primary mb-3">
            Create a profile
          </Link>
          <br />
          <i className="">
            You cannot send or recieve messages, and you cannot apply for adds
            without a profile{' '}
          </i>
        </>
      )}
    </div>
  );
};

Dashboard.prototype = {
  deleteProfile: PropTypes.func,
  deleteUser: PropTypes.func,
  removeLink: PropTypes.func,
  removeSkill: PropTypes.func,
  getCurrentProfile: PropTypes.func,
  auth: PropTypes.object,
  profile: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilesReducer,
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, {
  getCurrentProfile,
  removeSkill,
  removeLink,
  deleteProfile,
  deleteUser,
})(Dashboard);
