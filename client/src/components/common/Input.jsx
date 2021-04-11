const Input = ({ name, label, error, icon, ...rest }) => {
  return (
    <div className="form-group">
      <i className={icon}>
        <label htmlFor={name}>{label}</label>
        <input {...rest} name={name} id={name} className="form-control" />
        {error && <span className="text-danger">{error}</span>}
      </i>
    </div>
  );
};

export default Input;
