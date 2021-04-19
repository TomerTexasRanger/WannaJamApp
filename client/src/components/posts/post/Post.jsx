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
  match,
  getPost,
  auth,
  post: { post, loading },
  applyToPost,
  unapplyToPost,
  deletePost,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, []);
  const [didApply, setDidApply] = useState(false);

  console.log(match.params.id);
  return loading && !post !== null ? (
    <Loader
      type="Audio"
      height={300}
      width={300}
      className="d-flex justify-content-center mt-5"
    />
  ) : (
    <>
      <section className="container">
        <Link to={`/post/${post._id}`} className="btn btn-info mb-2">
          Back To Classifieds
        </Link>
        <div className="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              {!post.image ? (
                <>
                  {' '}
                  <div>
                    <h2>No Photo</h2>
                  </div>
                </>
              ) : (
                <img
                  className="my-1"
                  src={
                    require(`../../../../../Backend/public/uploads/images/${
                      post.image === '' ? '' : post.image
                    }`).default
                  }
                  alt={post.userName}
                ></img>
              )}
              <h4>{post.userName}</h4>
            </a>
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
                className="btn btn-secondary float-right"
              >
                Unapply
              </button>
            ) : (
              <button
                onClick={() => {
                  applyToPost(post._id);
                  setDidApply(true);
                }}
                className="btn btn-success float-right"
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
