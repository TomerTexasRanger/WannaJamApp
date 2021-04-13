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

const Skill = ({ skill: { instrument, stars } }) => {
  const starNum = buildStars(stars);
  return (
    <>
      <tr>
        <td>{instrument}</td>
        <td>
          {starNum.map((item, i) => (
            <FaStar key={i} size={20} color={'gold'} />
          ))}
        </td>
      </tr>
    </>
  );
};

export default Skill;
