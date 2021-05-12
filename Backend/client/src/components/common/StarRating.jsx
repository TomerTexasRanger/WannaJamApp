import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';

const StarRating = ({ starValue, starNum = null }) => {
  const [rating, setRating] = useState(starNum);
  useEffect(() => {}, []);
  return (
    <div className="mb-4">
      <label className="mr-3">Level:</label>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                starValue(ratingValue);
              }}
            />
            <FaStar
              size={30}
              className="star"
              color={ratingValue <= rating ? 'gold' : 'grey'}
            />
          </label>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  starValue: PropTypes.number,
  starNum: PropTypes.number,
};

export default StarRating;
