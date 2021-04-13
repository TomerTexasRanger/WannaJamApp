const Education = ({ edu: { school, degree, description } }) => {
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
      </div>
    </>
  );
};

export default Education;
