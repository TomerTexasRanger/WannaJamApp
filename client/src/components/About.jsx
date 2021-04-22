import PageHeader from './layout/PageHeader';
import FilterBar from './common/FilterBar';

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
        <FilterBar data />
      </div>
    </>
  );
};

export default About;
