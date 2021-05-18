import PageHeader from './layout/PageHeader';

const About = () => {
  return (
    <>
      <div className="container">
        <PageHeader titleText={'About WannaJam'} />{' '}
        <div className="col-12">
          <p className="t-lead">
            WannaJam is an online social network, created by Tomer Sapir in
            2021. <br /> Its goal is to create an index of musicians, <br />{' '}
            both professional and amateur, in order to assist them in finding
            creative partners. <br /> Its users bank can range from big
            production companies looking for session musicians, <br /> to middle
            aged moms and dads looking to jam with some like minded individuals
            on weekends. <br /> Our mission is to provide a reliable, easy to
            use and easy to access platform in which people of all ages and
            living areas, <br /> could have a chance to find the person they
            need to achive their visions.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
