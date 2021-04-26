import PropTypes from 'prop-types';

const Education = ({
  edu: { _id, school, degree, description },
  removeEducation,
}) => {
  return (
    <>
      <div>
        <h4>
          <strong>School:</strong> {school}
        </h4>
        <h4>
          <strong>Degree/Certificate:</strong> {degree}
        </h4>
        <p>
          <strong>Description:</strong> {description}
        </p>
        <button
          onClick={() => {
            removeEducation(_id);
            window.location = '/dashboard';
          }}
          className="btn btn-danger"
        >
          X
        </button>
      </div>
      <div className="line"></div>
    </>
  );
};

Education.prototype = {
  edu: PropTypes.object,
  removeEducation: PropTypes.func,
};

export default Education;
