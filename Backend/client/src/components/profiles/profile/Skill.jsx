import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
const buildStars = (stars) => {
  let addStars = [];
  let x = 0;
  for (x = 0; x < stars; x++) {
    addStars.push(x);
  }
  return addStars;
};

const Skill = ({ removeSkill, skill, _id = null, user = null }) => {
  const starNum = buildStars(skill.stars);
  return (
    <>
      <tr>
        <td className="">
          <h5>{skill.instrument}</h5>
        </td>
        <td>
          {starNum.map((item, i) => (
            <FaStar key={i} size={20} color={'gold'} />
          ))}
        </td>
        {_id && user._id && _id === user._id ? (
          <td>
            <button
              onClick={() => {
                removeSkill(skill._id);
                window.location = '/dashboard';
              }}
              className="button button-danger"
            >
              X
            </button>
          </td>
        ) : (
          ''
        )}
      </tr>
    </>
  );
};

Skill.prototype = {
  removeSkill: PropTypes.func,
  skill: PropTypes.object,
  user: PropTypes.object,
};

export default Skill;
