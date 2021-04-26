import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Links = ({ profile: { links, user }, user: { _id }, removeLink }) => {
  return (
    <div className="profile-links  ">
      <h2 className=" my-1">
        <i className="fas fa-link"></i>Links:
      </h2>
      <div className="link  my-1 p-2">
        <div className="overflow-auto">
          <ul>
            {links.length > 0 ? (
              links.map((link) => {
                return (
                  <li key={link._id}>
                    <h3>{link.title}</h3>
                    <h5>
                      <a href={link.link}>{link.link}</a>
                      <button
                        onClick={() => {
                          removeLink(link._id);
                          window.location('/dashboard');
                        }}
                        className="button button-danger ml-4"
                      >
                        X
                      </button>
                    </h5>

                    <div className="line"></div>
                  </li>
                );
              })
            ) : (
              <h5>No Links...</h5>
            )}
          </ul>
          {_id === user._id && (
            <Link className="button button-dark float-right" to="/add-link">
              Add A Link
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

Link.prototype = {
  profile: PropTypes.object,
  user: PropTypes.object,
  removeLink: PropTypes.func,
};

export default Links;
