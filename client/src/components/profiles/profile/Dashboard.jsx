import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  removeSkill,
  removeLink,
  deleteProfile,
} from '../../../actions/profilesActions';
import { deleteUser } from '../../../actions/authActions';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
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
      <PageHeader titleText={'Dashbord'} />
      <i className="fas fa-user"></i>
      <button
        className="btn btn-danger"
        onClick={() =>
          window.confirm(
            'Are you sure you want to delete your user and profile?'
          ) && deleteUser()
        }
      >
        Delete User
      </button>
      <h3 className=""> Welcome {user && user.name}</h3>
      <h4>
        Joined : <Moment format="DD/MM/YYYY">{date}</Moment>
      </h4>
      {profile !== null ? (
        <>
          <div className="d-flex justify-content-end">
            <Link className="btn btn-success mr-0 " to="/edit-profile">
              Edit Profile
            </Link>
            <button
              onClick={() =>
                window.confirm(
                  'Are you Sure you want to delete your profile?'
                ) && deleteProfile()
              }
              className="btn btn-danger ml-2 mr-0 "
              to="/edit-profile"
            >
              Delete Profile
            </button>
          </div>

          <div className="profile-grid my-1">
            <TopLeft profile={profile} user={user} />
            <div className="profile-right bg-light p-2">
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
          <p>Wanna jam?, show us what you got by creating a profile</p>
          <Link to="/create-profile" className="btn btn-primary">
            Create a profile
          </Link>
          <br />
          <i>
            You cannot send or recieve messages, and you cannot apply for adds
            without a profile{' '}
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

export default connect(mapStateToProps, {
  getCurrentProfile,
  removeSkill,
  removeLink,
  deleteProfile,
  deleteUser,
})(Dashboard);
