import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

const NavBar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand banner" to="/">
          WannaJam
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {!isAuthenticated && !loading && (
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              </li>
            )}

            {!isAuthenticated && !loading && (
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
            )}

            {isAuthenticated && !loading && (
              <li className="nav-item">
                <Link className="nav-link" to="/posts">
                  <i className="fas fa-handshake mr-2"></i>
                  Classifieds
                </Link>
              </li>
            )}
            {isAuthenticated && !loading && (
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  <i className="fas fa-users mr-2"></i>
                  Profiles
                </Link>
              </li>
            )}
            {isAuthenticated && !loading && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <i className="fas fa-user mr-2"></i>
                  {user.name}
                </Link>
              </li>
            )}

            {isAuthenticated && !loading && (
              <li className="nav-item">
                <Link onClick={logout} className="nav-link" to="/signin">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

NavBar.prototype = {
  auth: PropTypes.object,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logout })(NavBar);
