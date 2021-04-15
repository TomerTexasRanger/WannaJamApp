import Skill from './Skill';
import { Link } from 'react-router-dom';

const TopRight = ({ profile: { userName, age, location, bio, skills } }) => {
  return (
    <>
      <div className="top">
        <h1 className="large">
          {userName}, {age}
        </h1>
        <h3 className="">{location}</h3>
      </div>
      <div className="skills">
        <h2 className="text-primary">Skills</h2>

        <table className="table table-borderless">
          <tbody>
            {skills.map((skill) => {
              return <Skill key={skill._id} skill={skill} />;
            })}
          </tbody>
        </table>
        <Link className="btn btn-secondary float-right" to="/add-skills">
          Add skills
        </Link>
      </div>
      <div className="bio text-break">
        <h2 className="text-primary">BIO</h2>
        <p>{bio}</p>
      </div>
    </>
  );
};

export default TopRight;
