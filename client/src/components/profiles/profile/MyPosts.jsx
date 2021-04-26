import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const MyPosts = ({ myPosts, deletePost, getMyPosts }) => {
  return (
    <>
      <div>
        <h2>My Adds</h2>

        <div className="line"></div>
        <table className="table">
          <tbody>
            {myPosts &&
              myPosts.map((post) => (
                <tr key={post._id}>
                  <td>
                    <Link to={`/post/${post._id}`}>
                      <h6>{post.headline}</h6>
                    </Link>
                  </td>
                  <td>{`(${post.apply.length})`}</td>
                  <td>
                    <button
                      onClick={() => {
                        deletePost(post._id);
                        getMyPosts();
                        window.location = '/dashboard';
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Moment format="DD/MM/YYYY">{post.date}</Moment>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

MyPosts.prototype = {
  myPosts: PropTypes.func,
  deletePost: PropTypes.func,
  getMyPosts: PropTypes.func,
};

export default MyPosts;
