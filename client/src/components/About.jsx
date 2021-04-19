import PageHeader from './layout/PageHeader';

const About = () => {
  return (
    <>
      <div className="container">
        <PageHeader titleText={'About Page'} />{' '}
        <div className="row">
          <div className="col-12">
            <p>Content example text for about page here.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
