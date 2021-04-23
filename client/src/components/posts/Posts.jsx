import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postsActions';
import {
  filterPostsByName,
  filterPostsByInstrument,
  filterPostsByRegion,
  filterPostsByFee,
} from '../../actions/filterActions';
import { getCurrentProfile } from '../../actions/profilesActions';
import Loader from 'react-loader-spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import FilterBar from '../common/FilterBar';
import Pagination from '../common/Pagination';
const Posts = ({
  getCurrentProfile,
  getPosts,
  posts: { posts, loading },
  profile: { profile },
}) => {
  // const [data, setData] = useState('');
  const [fillPosts, setFillPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await getCurrentProfile();
      const res = await getPosts();
      setFillPosts(res);
    };
    fetchData();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
      {' '}
      <section className="container">
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas-fa-user"></i>Welcome to to whataddfladf
        </p>
        <PostForm />
        <FilterBar
          // data={data}
          // setData={setData}
          dataArr={posts}
          categories={categories}
          stateFunc={setFillPosts}
        />
        <div className="posts">
          {console.log(fillPosts)}
          {fillPosts.length > 0 ? (
            fillPosts.map((post) => (
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer,
    profile: state.profilesReducer,
  };
};

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts);
