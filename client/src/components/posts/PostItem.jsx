import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  applyToPost,
  unapplyToPost,
  deletePost,
  getPost,
} from '../../actions/postsActions';
import { Image } from 'cloudinary-react';

import { useEffect, useState } from 'react';

const PostItem = ({
  deletePost,
  applyToPost,
  unapplyToPost,
  auth,
  post: { _id, headline, text, userName, date, image, user, apply },
  profile: { profile },
}) => {
  const [didApply, setDidApply] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await checkIfApplied();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const checkIfApplied = () => {
    if (
      apply.filter((app) => {
        return app.userProfile.toString() === profile._id.toString();
      }).length > 0
    ) {
      return setDidApply(true);
    } else {
      return setDidApply(false);
    }
  };

  return (
    <>
      <div className="post p-1 my-1">
        <div>
          <Link to={`/profile/${profile._id}`}>
            {image ? (
              // <img
              //   className="border shadow"
              //   src={
              //     image &&
              //     require(`../../../../public/uploads/images/${image}`).default
              //   }
              //   alt={userName}
              // />
              <Image cloudName="dq7ozi1cg" publicId={image.imgData} />
            ) : (
              <h3>No Photo</h3>
            )}
            <h3>{userName}</h3>
          </Link>
        </div>
        <div>
          <h5>{headline}</h5>
          <p>
            Posted on <Moment format={'DD/MM/YY'}>{date}</Moment>
          </p>

          {didApply ? (
            <button
              onClick={() => {
                unapplyToPost(_id);
                setDidApply(false);
              }}
              className="button button-dark float-right"
            >
              Unapply
            </button>
          ) : (
            <button
              onClick={() => {
                applyToPost(_id, profile.user._id);
                setDidApply(true);
              }}
              className="button button-success float-right"
            >
              Apply Now
            </button>
          )}
          <Link to={`/post/${_id}`} className="button button-info float-right">
            More Info
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => {
                deletePost(_id);
                window.location = '/posts';
              }}
              className="button button-danger float-right"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
};

PostItem.prototype = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  applyToPost: PropTypes.func,
  unapplyToPost: PropTypes.func,
  deletePost: PropTypes.func,
  getPost: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
    profile: state.profilesReducer,
  };
};

export default connect(mapStateToProps, {
  applyToPost,
  unapplyToPost,
  deletePost,
  getPost,
})(PostItem);
