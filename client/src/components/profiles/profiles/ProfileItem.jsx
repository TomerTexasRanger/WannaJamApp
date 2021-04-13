import { Link } from 'react-router-dom';
import Skill from '../profile/Skill';

const ProfileItem = ({
  profile: { userName, location, _id, skills, image, age },
}) => {
  return (
    <div className="profile bg-light">
      <img className="" src={image} alt={userName}></img>
      <div>
        <h2>
          {userName} {age}
        </h2>
        <p>{location}</p>
      </div>
      <div></div>
      <div className="line"></div>
      <div className="profiles-skills">
        <table className=" ">
          <tbody>
            {skills.map((skill) => {
              return <Skill key={skill._id} skill={skill} />;
            })}
          </tbody>
        </table>
      </div>
      <ul className="profiles-genres">
        <li>* jazz</li>
        <li>* rock</li>
        <li>* rap</li>
      </ul>
      <a className="btn btn-primary" href="profile.html">
        Profile
      </a>
    </div>
  );
};

export default ProfileItem;
