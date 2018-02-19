import React from "react";
//require("react-datetime");

export const Input = ({ id, name, type, className, ...props }) => {
  className = className === undefined ? "form-control" : className;

  return (
    <input
      id={id}
      name={name}
      type={type}
      className={className}
      onBlur={this.onBlur}
      {...props}
    />
  );
};

export const Select = ({
  id,
  name,
  type,
  className,
  emptyOption,
  options,
  ...props
}) => {
  className = className === undefined ? "form-control" : className;

  return (
    <select
      id={id}
      name={name}
      className={className}
      onBlur={this.onBlur}
      {...props}
    >
      {emptyOption && <option value="" />}
      {options.map(option => {
        return <option value={option.value}>{option.label}</option>;
      })}
    </select>
  );
};

export const Textarea = ({ id, name, className, ...props }) => {
  className = className === undefined ? "form-control" : className;

  return (
    <textarea
      id={id}
      name={name}
      className={className}
      onBlur={this.onBlur}
      {...props}
    />
  );
};

export const RadioList = ({
  id,
  name,
  type,
  label,
  options,
  inline,
  ...props
}) => {
  return (
    <div>
      {options.map(entry => {
        return (
          <div class="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                name={name}
                className="form-check-input"
                value={entry.value}
              />
              {entry.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export const Checkbox = ({ id, name, text, ...props }) => {
  return (
    <label className="custom-control custom-checkbox">
      <input type="checkbox" name={name} className="custom-control-input" />
      <span class="custom-control-indicator" />
      <span className="custom-control-description">{text}</span>
    </label>
  );
};

export const CheckboxList = ({
  id,
  name,
  type,
  label,
  options,
  inline,
  ...props
}) => {
  return (
    <div>
      {options.map(entry => {
        return (
          <div class={"form-check " + inline ? "form-check-inline" : ""}>
            <label className="form-check-label">
              <input
                type="checkbox"
                name={name}
                className="form-check-input"
                value={entry.value}
              />
              {entry.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};
