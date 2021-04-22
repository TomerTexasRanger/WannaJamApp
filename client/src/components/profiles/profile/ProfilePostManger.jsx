import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getAppliedPosts,
  getMyPosts,
  deletePost,
  unapplyToPost,
  getPost,
} from '../../../actions/postsActions';
import { getCurrentProfile } from '../../../actions/profilesActions';
import AppliedPosts from './AppliedPosts';
import MyPosts from './MyPosts';

const ProfilePostsManager = ({
  unapplyToPost,
  getPost,
  getMyPosts,
  deletePost,
  getAppliedPosts,
  getCurrentProfile,
  profile: { profile },
  post: { posts },
}) => {
  const [myPosts, setMyPosts] = useState([]);
  console.log(myPosts);
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfile();
      await getAppliedPosts();

      setMyPosts(await getMyPosts());
    };
    fetchData();
  }, []);

  const handleMyPosts = () => {
    setMyPosts(getMyPosts());
  };
  const handleAppliedPosts = () => {
    getAppliedPosts();
  };
  const handleDeletePost = (id) => {
    deletePost(id);
  };
  const handleUnapplyToPost = (id) => {
    unapplyToPost(id);
  };

  return (
    <>
      <h2 className="text-center">Applications manager:</h2>
      <div className="post-manager">
        <div className="applied-posts">
          <AppliedPosts
            profile={profile}
            posts={posts}
            getAppliedPosts={handleAppliedPosts}
            unapplyToPost={(id) => handleUnapplyToPost(id)}
            getPost={getPost}
          />
        </div>
        <div className="my-posts">
          <MyPosts
            profile={profile}
            myPosts={myPosts}
            getMyPosts={handleMyPosts}
            deletePost={(id) => handleDeletePost(id)}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilesReducer,
    post: state.postsReducer,
  };
};

export default connect(mapStateToProps, {
  getCurrentProfile,
  getAppliedPosts,
  getMyPosts,
  deletePost,
  unapplyToPost,
  getPost,
})(ProfilePostsManager);
