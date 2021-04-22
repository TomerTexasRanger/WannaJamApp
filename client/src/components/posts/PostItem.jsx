import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  applyToPost,
  unapplyToPost,
  deletePost,
  getPost,
} from '../../actions/postsActions';

import { useEffect, useState } from 'react';

const PostItem = ({
  getPost,
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
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${profile._id}`}>
            {image ? (
              <img
                className="border shadow"
                src={
                  image &&
                  require(`../../../../Backend/public/uploads/images/${image}`)
                    .default
                }
                alt={userName}
              />
            ) : (
              <h4>No Photo</h4>
            )}
            <h4>{userName}</h4>
          </Link>
        </div>
        <div>
          <h5>{headline}</h5>
          <p>
            Posted on <Moment format={'DD/MM/YY'}>{date}</Moment>
          </p>
          {/* {apply.filter(
            (app) => app.userProfile.toString() === profile.toString()
          ).length > 0 ? (
            <button
              onClick={() => unapplyToPost(_id)}
              className="btn btn-secondary float-right"
            >
              Unapply
            </button>
          ) : (
            <button
              onClick={() => applyToPost(_id)}
              className="btn btn-success float-right"
            >
              Apply Now
            </button>
          )} */}
          {/* {didApply &&
          apply.filter(
            (app) => app.userProfile.toString() === profile.toString()
          ).length > 0 ? (
            <button
              onClick={() => {
                unapplyToPost(_id);
                setDidApply(false);
              }}
              className="btn btn-secondary float-right"
            >
              Unapply
            </button>
          ) : (
            <button
              onClick={() => {
                applyToPost(_id);
                setDidApply(true);
              }}
              className="btn btn-success float-right"
            >
              Apply Now
            </button>
          )} */}

          {didApply ? (
            <button
              onClick={() => {
                unapplyToPost(_id);
                setDidApply(false);
              }}
              className="btn btn-secondary float-right"
            >
              Unapply
            </button>
          ) : (
            <button
              onClick={() => {
                applyToPost(_id, profile.user._id);
                setDidApply(true);
              }}
              className="btn btn-success float-right"
            >
              Apply Now
            </button>
          )}
          <Link to={`/post/${_id}`} className="btn btn-info float-right">
            More Info
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => {
                deletePost(_id);
                window.location = '/posts';
              }}
              className="btn btn-danger float-right"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
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
