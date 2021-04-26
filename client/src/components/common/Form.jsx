import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('works');
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    let { type, name, value } = input;
    value = type === 'checkbox' ? input.checked : input.value;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    const data = { ...this.state.data };
    data[name] = value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return <button className="button button-primary">{label}</button>;
  }

  renderInput(name, label, icon, type = 'text', bootClass) {
    const { data, errors } = this.state;

    return (
      <Input
        bootClass={bootClass}
        type={type}
        name={name}
        icon={icon}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        checked={this.state.data.licensed}
      />
    );
  }
}

export default Form;
