import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skill from '../profile/Skill';
const ProfileItem = ({
  profile: { userName, location, _id, skills, image, age, genres },
}) => {
  return (
    <div className="profile">
      <div className="profileItem-image mb-2 ">
        {image ? (
          <img
            className=""
            src={
              image &&
              require(`../../../../../public/uploads/images/${image}`).default
            }
            alt={userName}
          ></img>
        ) : (
          <h4>No Photo</h4>
        )}
      </div>

      <div>
        <h2>
          {userName} {age}
        </h2>
        <h5>{location}</h5>
      </div>
      <div></div>
      <div className="line mt-0"></div>
      <div className="profiles-skills">
        <table className="table table-borderless table-sm mb-0">
          <tbody>
            {skills.slice(0, 2).map((skill) => {
              return <Skill key={skill._id} skill={skill} />;
            })}
          </tbody>
        </table>
      </div>
      <ul className="profiles-genres mb-1 ">
        {genres.slice(0, 3).map((genre) => {
          return (
            <li key={genre._id}>
              <h5>*{genre.genre}</h5>
            </li>
          );
        })}
      </ul>
      <Link className="button button-primary mt-auto" to={`/profile/${_id}`}>
        Profile
      </Link>
    </div>
  );
};

ProfileItem.prototype = {
  profile: PropTypes.object,
};

export default ProfileItem;
