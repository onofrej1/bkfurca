import React, { Component } from "react";

class Input extends Component {
  render() {
    let { id, name, type, label, help, error, ...props } = this.props;

    return (
      <div class="form-group {error != '' && 'has-error'}">
        <label>{label}</label>
        <input
          id={id}
          name={name}
          type={type}
          class="form-control"
          onBlur={this.onBlur}
          {...props}
        />
        {help && <p class="help-block">{help}</p>}
        {error && <p class="help-block">{error}</p>}
      </div>
    );
  }
}

export default Input;
