import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TopLeft = ({
  user: { _id },

  profile: {
    image,
    userName,
    phone,
    email,
    youtube,
    facebook,
    instagram,
    licensed,
    user,
  },
}) => {
  return (
    <div className="profile-left  p-2">
      {user._id && _id === user._id ? (
        <Link className="button button-light p-1 mb-1" to="/add-image">
          Upload Image
        </Link>
      ) : (
        ''
      )}

      {!image ? (
        <>
          {' '}
          <div>
            <h2>No Photo</h2>
          </div>
        </>
      ) : (
        <div className="profile-image">
          <img
            className="my-1"
            src={
              require(`../../../../../Backend/public/uploads/images/${
                image === '' ? '' : image
              }`).default
            }
            alt={userName}
          ></img>
        </div>
      )}
      <h4>
        <strong>Phone:</strong> {phone}
      </h4>
      <h4>
        <strong>Email:</strong> {email}
      </h4>

      <div className="icons my-1 mt-3">
        {
          <Link to="#">
            <i className="fas fa-globe fa-2x"></i>
          </Link>
        }
        {youtube && (
          <Link to={youtube}>
            <i className="fab fa-youtube fa-2x"></i>
          </Link>
        )}
        {facebook && (
          <Link to={facebook}>
            <i className="fab fa-facebook fa-2x"></i>
          </Link>
        )}
        {instagram && (
          <Link to={instagram}>
            <i className="fab fa-instagram fa-2x"></i>
          </Link>
        )}
      </div>
      <div>
        {licensed && <i className="fas fa-certificate lead"> עוסק מורשה</i>}
      </div>
    </div>
  );
};

TopLeft.prototype = {
  user: PropTypes.object,
  profile: PropTypes.object,
};

export default TopLeft;
