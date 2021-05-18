import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPost,
  applyToPost,
  deletePost,
  unapplyToPost,
} from '../../../actions/postsActions';
import {
  getCurrentProfile,
  getAllProfiles,
} from '../../../actions/profilesActions';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import ProfileItem from '../../profiles/profiles/ProfileItem';
import { Image } from 'cloudinary-react';

const Post = ({
  profiles: { profiles, profile },
  post: { post, loading },
  match,
  getPost,
  auth,
  getAllProfiles,
  getCurrentProfile,
  applyToPost,
  unapplyToPost,
  deletePost,
}) => {
  const [didApply, setDidApply] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await getPost(match.params.id);
      await getCurrentProfile();
      await getAllProfiles();
      await setDidApply(checkIfApplied());
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const checkIfApplied = () => {
    if (!loading || post !== null) {
      if (
        post.apply.filter((app) => {
          return app.userProfile.toString() === profile._id.toString();
        }).length > 0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  return loading || post === null ? (
    <Loader
      type="Audio"
      height={300}
      width={300}
      className="d-flex justify-content-center mt-5"
    />
  ) : (
    <>
      {checkIfApplied()}
      <section className="container">
        <Link to={`/posts`} className="button button-primary mb-2">
          Back To Classifieds
        </Link>
        <div className="post bg-light p-1 my-1">
          <div>
            <Link to={`/profile/${post.profile}`}>
              {!post.image ? (
                <>
                  {' '}
                  <div>
                    <h2>No Photo</h2>
                  </div>
                </>
              ) : (
                // <img
                //   className="my-1"
                //   src={
                //     require(`../../../../../public/uploads/images/${
                //       post.image === '' ? '' : post.image
                //     }`).default
                //   }
                //   alt={post.userName}
                // ></img>
                <Image cloudName="dq7ozi1cg" publicId={post.image.imgData} />
              )}
              <h3>{post.userName}</h3>
            </Link>
          </div>
          <div>
            <div className="p-2">
              <h5 className="text-break">{post.headline}</h5>
              <p className="text-break">{post.text}</p>
              <p>
                Posted on <Moment format={'DD/MM/YY'}>{post.date}</Moment>
              </p>
            </div>
            {didApply ? (
              <button
                onClick={() => {
                  unapplyToPost(post._id);
                  setDidApply(false);
                }}
                className="button button-dark float-right"
              >
                Unapply
              </button>
            ) : (
              <button
                onClick={() => {
                  applyToPost(post._id);
                  setDidApply(true);
                }}
                className="button button-success float-right"
              >
                Apply Now
              </button>
            )}

            {!auth.loading && post.user === auth.user._id && (
              <button
                onClick={() => deletePost(post._id)}
                className="btn btn-danger float-right"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        <div className="applicants">
          <h2 className="mt-5">Applicants:</h2>
          <div className="line"></div>
          <div className="profiles">
            {post.apply &&
              post.apply.map((app) => {
                // eslint-disable-next-line array-callback-return
                return profiles.map((profile) => {
                  if (profile._id.toString() === app.userProfile.toString()) {
                    return <ProfileItem key={profile._id} profile={profile} />;
                  }
                });
              })}
          </div>
        </div>
      </section>
    </>
  );
};

Post.prototype = {
  post: PropTypes.object,
  auth: PropTypes.object,
  profiles: PropTypes.object,
  getAllProfiles: PropTypes.func,
  getCurrentProfile: PropTypes.func,
  getPost: PropTypes.func,
  unapplyToPost: PropTypes.func,
  applyToPost: PropTypes.func,
  deletePost: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    post: state.postsReducer,
    auth: state.authReducer,
    profiles: state.profilesReducer,
  };
};

export default connect(mapStateToProps, {
  getAllProfiles,
  getCurrentProfile,
  getPost,
  unapplyToPost,
  applyToPost,
  deletePost,
})(Post);
