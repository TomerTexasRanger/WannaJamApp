import { Link } from 'react-router-dom';
import Skill from '../profile/Skill';

const ProfileItem = ({
  match,
  profile: { userName, location, _id, skills, image, age, genres },
}) => {
  return (
    <div className="profile bg-light">
      <div className="profileItem-image ">
        {image ? (
          <img
            className=""
            src={
              image &&
              require(`../../../../../Backend/public/uploads/images/${image}`)
                .default
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
        <p>{location}</p>
      </div>
      <div></div>
      <div className="line mt-0"></div>
      <div className="profiles-skills">
        <table className=" ">
          <tbody>
            {skills.slice(0, 3).map((skill) => {
              return <Skill key={skill._id} skill={skill} />;
            })}
          </tbody>
        </table>
      </div>
      <ul className="profiles-genres mt-auto">
        {genres.slice(0, 3).map((genre) => {
          return <li key={genre._id}>*{genre.genre}</li>;
        })}
      </ul>
      <Link className="btn btn-primary mt-auto" to={`/profile/${_id}`}>
        Profile
      </Link>
    </div>
  );
};

export default ProfileItem;
