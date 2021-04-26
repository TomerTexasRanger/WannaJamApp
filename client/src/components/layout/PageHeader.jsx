import PropTypes from 'prop-types';

const PageHeader = ({ titleText }) => {
  return (
    <div className="row mb-5 text-center">
      <div className="col-12 mt-4">
        <h1 className="">{titleText}</h1>
      </div>
    </div>
  );
};

PageHeader.prototype = {
  titleText: PropTypes.string,
};

export default PageHeader;
