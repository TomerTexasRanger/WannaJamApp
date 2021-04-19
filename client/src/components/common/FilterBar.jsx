import { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import {
  filterByInstrument,
  filterByRegion,
  filterByAge,
  filterByName,
} from '../../actions/filterActions';

const FilterBar = ({ profiles }) => {
  const [data, setData] = useState('');
  const [filProfiles, setFillProfiles] = useState(profiles);

  const handleNameFilter = (e) => {
    e.preventDefault();
    const filtered = filterByName(data, profiles);
    setFillProfiles(filtered);

    return (
      <>
        <Navbar bg="light" expand="lg" className="mb-3 shadow">
          <Navbar.Brand href="#home">Filter By:</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="mr-auto">
              <NavDropdown title="Age" id="basic-nav-dropdown">
                <NavDropdown.Item
                  href="#action/3.1"
                  className="text-dark text-center"
                  onClick={() => setFillProfiles(filterByAge('a', profiles))}
                >
                  18-30
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() => setFillProfiles(filterByAge('b', profiles))}
                >
                  30-50
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() => setFillProfiles(filterByAge('c', profiles))}
                >
                  50 +
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() => setFillProfiles(filterByAge('d', profiles))}
                >
                  All
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Location" id="basic-nav-dropdown">
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByRegion('north', profiles))
                  }
                >
                  North
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center "
                  onClick={() =>
                    setFillProfiles(filterByRegion('center', profiles))
                  }
                >
                  Center
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByRegion('south', profiles))
                  }
                >
                  South
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() => setFillProfiles(filterByRegion('', profiles))}
                >
                  All
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Instrument" id="basic-nav-dropdown">
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByInstrument('Guitar', profiles))
                  }
                >
                  Guitar
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByInstrument('Drums', profiles))
                  }
                >
                  Drums
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByInstrument('Piano', profiles))
                  }
                >
                  Piano
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByInstrument('Vocals', profiles))
                  }
                >
                  Vocals
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByInstrument('Strings', profiles))
                  }
                >
                  Strings
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByInstrument('Percussion', profiles))
                  }
                >
                  Percussion
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByInstrument('Synth', profiles))
                  }
                >
                  Synth
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByInstrument('Bass', profiles))
                  }
                >
                  Bass
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByInstrument('Reeds', profiles))
                  }
                >
                  Reeds
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByInstrument('Brass', profiles))
                  }
                >
                  Brass
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-dark text-center"
                  onClick={() =>
                    setFillProfiles(filterByInstrument('Other', profiles))
                  }
                >
                  Other
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <form className="d-flex" onSubmit={handleNameFilter}>
              <input
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="form-control me-2"
                type="search"
                placeholder="Search By Name..."
                aria-label="Search"
              ></input>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  };
};

export default FilterBar;
