import Education from './Education';
import { Link } from 'react-router-dom';
const Bottom = ({ profile: { experience, education, links } }) => {
  return (
    <>
      <div className="profile-exp text-break bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        <div>
          <p className="lead">{experience}</p>
        </div>
      </div>
      <div className="profile-edu text-break bg-white p-2">
        {education.map((edu) => {
          return <Education key={edu._id} edu={edu} />;
        })}
        <Link className="btn btn-secondary float-right" to="/add-education">
          Add Education
        </Link>
      </div>
      <ul>
        <li></li>
      </ul>
    </>
  );
};

export default Bottom;
