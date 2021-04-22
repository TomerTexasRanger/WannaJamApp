import Skill from './Skill';
import { Link } from 'react-router-dom';

const TopRight = ({
  removeSkill,
  profile: { userName, age, location, bio, skills, user },
  user: { _id },
}) => {
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

        {skills.length > 0 ? (
          <table className="table table-borderless">
            <tbody>
              {skills.map((skill) => {
                return (
                  <Skill
                    key={skill._id}
                    skill={skill}
                    _id={_id}
                    user={user}
                    removeSkill={removeSkill}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <h5 className="text-center">No Skills Yet</h5>
        )}
        {_id === user._id ? (
          <Link className="btn btn-secondary float-right" to="/add-skills">
            Add skills
          </Link>
        ) : (
          ''
        )}
      </div>
      <div className="bio text-break">
        <h2 className="text-primary">BIO</h2>
        <p>{bio ? bio : <h5>No Bio Yet...</h5>}</p>
      </div>
    </>
  );
};

export default TopRight;
