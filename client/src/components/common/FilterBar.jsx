import { useState } from 'react';
import { filterByName, filterPostsByName } from '../../actions/filterActions';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

const FilterBar = ({ dataArr, categories, stateFunc }) => {
  const [search, setSearch] = useState('');
  const handleNameFilter = (e) => {
    console.log(search);
    e.preventDefault();
    if (
      window.location.pathname === '/profiles' ||
      window.location.pathname === '/'
    ) {
      const filtered = filterByName(search, dataArr);
      stateFunc(filtered);
    } else if (window.location.pathname === '/posts') {
      const filtered = filterPostsByName(search, dataArr);
      stateFunc(filtered);
    }
  };
  return (
    <Navbar expand="lg" className="mb-3 filter-bar position-absolute">
      <Navbar.Brand href="#home">Filter By:</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav ">
        <Nav className="mr-auto">
          {categories.map((category) => {
            return (
              <NavDropdown
                key={category.title}
                title={category.title}
                id="basic-nav-dropdown"
                className=""
              >
                {category.names.map((cat) => {
                  return (
                    <NavDropdown.Item
                      key={cat}
                      className="text-center nav-drop-item"
                      onClick={() => stateFunc(category.func(cat, dataArr))}
                    >
                      {cat}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            );
          })}
        </Nav>
        <form className="d-flex" onSubmit={handleNameFilter}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control me-2 bg-light"
            type="search"
            placeholder="Search By Name..."
            aria-label="Search"
          ></input>
          <button className="button button-success ml-1" type="submit">
            Search
          </button>
        </form>{' '}
      </Navbar.Collapse>
    </Navbar>
  );
};

FilterBar.prototype = {
  dataArr: PropTypes.array,
  categories: PropTypes.object,
  stateFunc: PropTypes.func,
};

export default FilterBar;
