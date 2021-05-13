const Input = ({
  name,
  label,
  error,
  icon,
  bootClass = 'form-control',
  ...rest
}) => {
  return (
    <div className="form-group">
      <i className={icon}>
        <label className="t-lead" htmlFor={name}>
          {label}
        </label>
        <input {...rest} name={name} id={name} className={bootClass} />
        {error && <span className="text-danger">{error}</span>}
      </i>
    </div>
  );
};

export default Input;
