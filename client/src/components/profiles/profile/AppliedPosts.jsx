import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const AppliedPosts = ({
  profile: { _id },
  posts,
  unapplyToPost,
  getAppliedPosts,
  getPost,
}) => {
  return (
    <>
      <div>
        <h2>Applied Adds</h2>
        <div className="line"></div>
        <table className="table">
          <tbody>
            {posts &&
              posts.map((post) => (
                <tr key={post._id}>
                  <td>
                    <Link
                      onClick={() => getPost(post._id)}
                      to={`/post/${post._id}`}
                    >
                      <h6>{post.headline}</h6>
                    </Link>
                  </td>
                  <td>{`(${post.apply.length})`}</td>
                  <td>
                    <button
                      onClick={() => {
                        unapplyToPost(post._id);
                        getAppliedPosts();
                        window.location = '/dashboard';
                      }}
                      className="btn btn-dark"
                    >
                      Unapply
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

export default AppliedPosts;
