import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profilesActions';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postsActions';
import {
  filterPostsByInstrument,
  filterPostsByRegion,
  filterPostsByFee,
} from '../../actions/filterActions';
import Loader from 'react-loader-spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import FilterBar from '../common/FilterBar';
import Pagination from '../common/Pagination';
import PageHeader from '../layout/PageHeader';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
//
//
const Posts = ({
  getCurrentProfile,
  getPosts,
  posts: { posts, loading },
  profile: { profile },
}) => {
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfile();
      const res = await getPosts();
      setFillPosts(res);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [fillPosts, setFillPosts] = useState([]);
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fillPosts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const categories = [
    {
      title: 'fee',
      names: ['Paid', 'Just for fun'],
      func: filterPostsByFee,
    },
    {
      title: 'region',
      names: ['North', 'Center', 'South', 'Other'],
      func: filterPostsByRegion,
    },
    {
      title: 'instrument',
      names: [
        'Guitar',
        'Drums',
        'Piano',
        'Vocals',
        'Strings',
        'Percussion',
        'Synths',
        'Bass',
        'Reeds',
        'Brass',
        'Other',
      ],
      func: filterPostsByInstrument,
    },
  ];

  return loading ? (
    <Loader
      type="Audio"
      height={300}
      width={300}
      className="d-flex justify-content-center mt-5"
    />
  ) : (
    <>
      {profile === null ? (
        <h2 className="container">
          You must have a user profile in order to access this page
        </h2>
      ) : (
        <section className="container">
          <PageHeader titleText="Classifieds" />
          <PostForm />
          <FilterBar
            dataArr={posts}
            categories={categories}
            stateFunc={setFillPosts}
          />
          <div className="posts">
            {fillPosts.length > 0 ? (
              currentItems.map((post) => (
                <PostItem key={post._id} post={post} profile={profile} />
              ))
            ) : (
              <h3>No results found</h3>
            )}
          </div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={fillPosts.length}
            paginate={paginate}
          />
        </section>
      )}
    </>
  );
};

Posts.prototype = {
  posts: PropTypes.object,
  profile: PropTypes.object,
  getPosts: PropTypes.func,
  getCurrentProfile: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer,
    profile: state.profilesReducer,
  };
};

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts);
