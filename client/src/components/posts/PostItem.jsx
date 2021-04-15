import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  applyToPost,
  unapplyToPost,
  deletePost,
} from '../../actions/postsActions';
import { useState } from 'react';

const PostItem = ({
  deletePost,
  applyToPost,
  unapplyToPost,
  auth,
  post: { _id, headline, text, userName, profile, date, image, user, apply },
}) => {
  const [didApply, setDidApply] = useState(false);
  return (
    <>
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img className="border shadow" src={image} alt={userName} />
            <h4>{userName}</h4>
          </a>
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
                applyToPost(_id);
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
              onClick={() => deletePost(_id)}
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
  };
};

export default connect(mapStateToProps, {
  applyToPost,
  unapplyToPost,
  deletePost,
})(PostItem);
