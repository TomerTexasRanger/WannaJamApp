const Landing = () => {
  return (
    <section className="container-fluid landing d-flex align-items-center justify-content-center">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">WannaJam App</h1>
          <p className="lead">
            Create a musician profile/portfolio, and find your jamming partners
          </p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary mr-2">
              Sign Up
            </a>
            <a href="login.html" className="btn btn-light">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
