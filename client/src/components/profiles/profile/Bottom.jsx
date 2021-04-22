import Education from './Education';
import { Link } from 'react-router-dom';
import {
  removeGenre,
  getCurrentProfile,
  removeEducation,
} from '../../../actions/profilesActions';
import Genres from './Genres';
import AddGenres from '../profile-forms/AddGenres';
import { connect } from 'react-redux';
const Bottom = ({
  user: { _id },
  profile: { experience, education, genres, user },
  removeGenre,
  getCurrentProfile,
  removeEducation,
}) => {
  return (
    <>
      <div className="profile-exp text-break bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        <div>
          <p className="lead">
            {experience ? experience : <h5>No Experience Yet...</h5>}
          </p>
        </div>
      </div>
      <div className="profile-edu text-break bg-white p-2">
        {education.length > 0 ? (
          education.map((edu) => {
            return (
              <Education
                key={edu._id}
                edu={edu}
                removeEducation={removeEducation}
              />
            );
          })
        ) : (
          <h4>No Education...</h4>
        )}

        {_id === user._id && (
          <Link className="btn btn-secondary float-right" to="/add-education">
            Add Education
          </Link>
        )}
      </div>
      <div className="profile-genre bg-white p-2">
        <table>
          <tbody>
            {_id === user._id && genres
              ? genres.map((genre) => {
                  return (
                    <tr key={genre._id}>
                      <td>
                        <h5 className=""> * {genre.genre}</h5>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger p-1 ml-2 m-1"
                          onClick={() => {
                            removeGenre(genre._id);
                            getCurrentProfile();
                          }}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })
              : genres.map((genre) => {
                  return (
                    <tr key={genre._id}>
                      <td>
                        <h5 className=""> * {genre.genre}</h5>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>

        {_id === user._id && <AddGenres />}
      </div>
      <ul>
        <li></li>
      </ul>
    </>
  );
};

export default connect(null, {
  removeGenre,
  getCurrentProfile,
  removeEducation,
})(Bottom);
