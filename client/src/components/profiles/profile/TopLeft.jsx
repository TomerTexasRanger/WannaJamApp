import { Link } from 'react-router-dom';

const TopLeft = ({
  profile: {
    image,
    userName,
    phone,
    email,
    youtube,
    facebook,
    instagram,
    licensed,
  },
}) => {
  return (
    <div className="profile-left bg-primary p-2">
      <Link className="btn btn-success" to="/add-image">
        Upload Image
      </Link>
      {!image ? (
        <>
          {' '}
          <div>
            <h2>No Photo</h2>
          </div>
        </>
      ) : (
        <img
          className="my-1"
          src={
            require(`../../../../../Backend/public/uploads/images/${
              image === '' ? '' : image
            }`).default
          }
          alt={userName}
        ></img>
      )}

      <h3>
        <strong>Phone:</strong> {phone}
      </h3>
      <h3>
        <strong>Email:</strong> {email}
      </h3>

      <div className="icons my-1">
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

export default TopLeft;
