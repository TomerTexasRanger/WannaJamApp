import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { getAllProfiles } from '../../../actions/profilesActions';
import PageHeader from '../../layout/PageHeader';
import ProfileItem from './ProfileItem';
import {
  filterByName,
  filterByAge,
  filterByRegion,
  filterByInstrument,
} from '../../../actions/filterActions';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import FilterBar from '../../common/FilterBar';
import Pagination from '../../common/Pagination';

const Profiles = ({ profile: { profiles, loading }, getAllProfiles }) => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllProfiles();
      setFillProfiles(res);
    };
    fetchData();
  }, []);
  const [filProfiles, setFillProfiles] = useState(profiles);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filProfiles.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Filter Props
  const categories = [
    {
      title: 'age',
      names: ['18-30', '30-50', '50+'],
      func: filterByAge,
    },
    {
      title: 'region',
      names: ['North', 'Center', 'South', 'Other'],
      func: filterByRegion,
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
      func: filterByInstrument,
    },
  ];
  return (
    <>
      {loading ? (
        <Loader
          type="Audio"
          height={300}
          width={300}
          className="d-flex justify-content-center mt-5"
        />
      ) : (
        <div className="container">
          <PageHeader titleText={'Browse Profiles...'} />

          <FilterBar
            dataArr={profiles}
            categories={categories}
            stateFunc={setFillProfiles}
          />

          <main className="profiles-main">
            <div className="profiles">
              {profiles.length > 0 ? (
                currentItems.map((profile) => {
                  return <ProfileItem key={profile._id} profile={profile} />;
                })
              ) : (
                <h4>No profile found</h4>
              )}
            </div>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filProfiles.length}
              paginate={paginate}
            />
          </main>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilesReducer,
  };
};

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
