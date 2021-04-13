import { connect } from 'react-redux';
import { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { getAllProfiles } from '../../../actions/profilesActions';
import PageHeader from '../../layout/PageHeader';
import ProfileItem from './ProfileItem';
const Profiles = ({ profile: { profiles, loading }, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <PageHeader titleText={'Browse Profiles...'} />
          <main class="profiles-main">
            <div class="profiles">
              {profiles.length > 0 ? (
                profiles.map((profile) => {
                  return <ProfileItem key={profile._id} profile={profile} />;
                })
              ) : (
                <h4>No profile found</h4>
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilesReducer,
  };
};

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
