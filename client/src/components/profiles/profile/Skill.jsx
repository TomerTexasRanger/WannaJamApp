import { connect } from "react-redux";
const Skill = ({ skills }) => {
  return (
    <div className="card w-75">
      <div className="card-body">
        <h5 className="card-title">Drums</h5>
        <p className="card-text">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </p>
        <button className="btn btn-primary">X</button>
      </div>
    </div>
  );
};

export default connect(null)(Skill);
