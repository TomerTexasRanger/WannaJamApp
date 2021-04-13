const Links = () => {
  return (
    <div className="profile-links">
      <h2 className="text-primary my-1">
        <i className="fas fa-link"></i>Links:
      </h2>
      <div className="link bg-white my-1">
        <div>
          <h4>
            <a href="#">Link!</a>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa,
            doloremque.
          </p>
        </div>
        <div>
          <ul>
            <li className="badge badge-primary">Stars: 44</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Links;
