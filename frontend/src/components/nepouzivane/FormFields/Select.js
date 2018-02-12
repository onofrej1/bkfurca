import React, { Component } from "react";

class Select extends Component {
  render() {
    let { id, name, type, label, help, error, options, ...props } = this.props;

    return (
      <div class="form-group {error != '' && 'has-error'}">
        <label>{label}</label>
        <select
          id={id}
          name={name}
          type={type}
          class="form-control"
          onBlur={this.onBlur}
          {...props}
        >
          {options.map(option => {
            return <option value={option.value}>{option.label}</option>;
          })}
        </select>

        {help && <p class="help-block">{help}</p>}
        {error && <p class="help-block">{error}</p>}
      </div>
    );
  }
}

export default Select;
