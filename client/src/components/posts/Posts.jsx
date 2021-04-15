import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postsActions';
import Loader from 'react-loader-spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
const Posts = ({ getPosts, posts: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
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
      {' '}
      <section className="container">
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas-fa-user"></i>Welcome to to whataddfladf
        </p>
        <PostForm />
        <div className="posts">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer,
  };
};

export default connect(mapStateToProps, { getPosts })(Posts);
