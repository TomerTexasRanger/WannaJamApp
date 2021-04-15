import { connect } from 'react-redux';
import {
  getPost,
  applyToPost,
  deletePost,
  unapplyToPost,
} from '../../../actions/postsActions';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Post = ({
  getPost,
  auth,
  post: {
    post: { headline, text, image, userName, date, _id, user },
    loading,
  },
  applyToPost,
  unapplyToPost,
  deletePost,
  match,
}) => {
  const [didApply, setDidApply] = useState(false);

  useEffect(() => {
    getPost(match.params.id);
  }, []);
  return loading ? (
    <Loader
      type="Audio"
      height={300}
      width={300}
      className="d-flex justify-content-center mt-5"
    />
  ) : (
    <>
      <section className="container">
        <Link to={`/post/${_id}`} className="btn btn-info mb-2">
          Back To Classifieds
        </Link>
        <div className="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img className="border shadow" src={image} alt={userName} />
              <h4>{userName}</h4>
            </a>
          </div>
          <div>
            <div className="p-2">
              <h5 className="text-break">{headline}</h5>
              <p className="text-break">{text}</p>
              <p>
                Posted on <Moment format={'DD/MM/YY'}>{date}</Moment>
              </p>
            </div>
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
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.postsReducer,
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, {
  getPost,
  unapplyToPost,
  applyToPost,
  deletePost,
})(Post);
