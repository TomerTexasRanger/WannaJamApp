import PropTypes from 'prop-types';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <h5>Pages...</h5>
      <ul className="pagination">
        {pageNumbers.map((num) => (
          <li key={num} className="page-item">
            <button onClick={() => paginate(num)} className="page-link">
              {num}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.prototype = {
  itemsPerPage: PropTypes.string,
  totalItems: PropTypes.string,
  paginate: PropTypes.func,
};

export default Pagination;
