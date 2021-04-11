import { Link } from "react-router-dom";

const ProfileItem = ({ profile: { userName, location, _id } }) => {
  return (
    <div className="card" style={{ width: "18rem", margin: "1rem" }}>
      <img src="..." className="card-img-top" alt="..."></img>
      <div className="card-body">
        <h5 className="card-title">{userName}</h5>
        <p className="card-text">{location}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          To Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileItem;
