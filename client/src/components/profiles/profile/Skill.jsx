import StarRating from '../../common/StarRating';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';

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
  console.log(_id, user);
  return (
    <>
      <tr>
        <td>{skill.instrument}</td>
        <td>
          {starNum.map((item, i) => (
            <FaStar key={i} size={20} color={'gold'} />
          ))}
        </td>
        {_id && user._id && _id === user._id ? (
          <td>
            {' '}
            <button
              onClick={() => {
                removeSkill(skill._id);
                window.location = '/dashboard';
              }}
              className="btn btn-danger"
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

export default Skill;
