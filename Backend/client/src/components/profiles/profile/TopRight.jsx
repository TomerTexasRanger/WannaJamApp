import Skill from './Skill';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TopRight = ({
  removeSkill,
  profile: { userName, age, location, bio, skills, user },
  user: { _id },
}) => {
  return (
    <>
      <div className="top">
        <h2 className="t-large">
          {userName}, {age}
        </h2>
        <h3 className="">{location}</h3>
      </div>
      <div className="skills">
        <h2 className="">Skills</h2>

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
          <Link
            className="button button-dark float-right mt-auto"
            to="/add-skills"
          >
            Add skills
          </Link>
        ) : (
          ''
        )}
      </div>
      <div className="bio text-break">
        <h2 className="">BIO</h2>
        <p className="t-lead">{bio ? bio : <h5>No Bio Yet...</h5>}</p>
      </div>
    </>
  );
};

TopRight.prototype = {
  removeSkill: PropTypes.func,
  profile: PropTypes.object,
  user: PropTypes.object,
};

export default TopRight;
