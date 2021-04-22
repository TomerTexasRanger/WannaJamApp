const Education = ({
  edu: { _id, school, degree, description },
  removeEducation,
}) => {
  return (
    <>
      <h2 className="text-primary">Education</h2>
      <div>
        <h3>
          <strong>School:</strong> {school}
        </h3>
        <h3>
          <strong>Degree/Certificate:</strong> {degree}
        </h3>
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

export default Education;
