import PropTypes from 'prop-types';
import Education from './Education';
import { Link } from 'react-router-dom';
import {
  removeGenre,
  getCurrentProfile,
  removeEducation,
} from '../../../actions/profilesActions';
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
      <div className="profile-exp text-break  p-2">
        <h2 className="">Experience</h2>
        <div>
          <p className="lead">
            {experience ? experience : <>No Experience Yet...</>}
          </p>
        </div>
      </div>
      <div className="profile-edu text-break  p-2">
        <h2 className="">Education</h2>

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
          <p className="lead">No Education...</p>
        )}

        {_id === user._id && (
          <Link
            className="button button-dark float-right mt-4"
            to="/add-education"
          >
            Add Education
          </Link>
        )}
      </div>
      <div className="profile-genre  p-2">
        {_id === user._id && <AddGenres />}

        <table>
          <tbody>
            {_id === user._id && genres
              ? genres.map((genre) => {
                  return (
                    <tr key={genre._id}>
                      <td>
                        <p> * {genre.genre}</p>
                      </td>
                      <td>
                        <button
                          className="button button-danger p-1 ml-2 m-1"
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
                        <h5> * {genre.genre}</h5>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      <ul>
        <li></li>
      </ul>
    </>
  );
};

Bottom.prototype = {
  user: PropTypes.object,
  profile: PropTypes.object,
  removeGenre: PropTypes.func,
  getCurrentProfile: PropTypes.func,
  removeEducation: PropTypes.func,
};

export default connect(null, {
  removeGenre,
  getCurrentProfile,
  removeEducation,
})(Bottom);
