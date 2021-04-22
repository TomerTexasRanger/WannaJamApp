import { Link } from 'react-router-dom';

const Links = ({ profile: { links, user }, user: { _id }, removeLink }) => {
  return (
    <div className="profile-links ">
      <h2 className="text-primary my-1">
        <i className="fas fa-link"></i>Links:
      </h2>
      <div className="link bg-white my-1 p-2">
        <div className="overflow-auto">
          <ul>
            {links.length > 0 ? (
              links.map((link) => {
                return (
                  <li>
                    <h3>{link.title}</h3>
                    <h5>
                      <a href={link.link}>{link.link}</a>
                      <button
                        onClick={() => {
                          removeLink(link._id);
                          window.location('/dashboard');
                        }}
                        className="btn btn-danger ml-4"
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
            <Link className="btn btn-secondary float-right" to="/add-link">
              Add A Link
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Links;
