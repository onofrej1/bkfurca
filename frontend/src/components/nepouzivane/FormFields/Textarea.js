import React, { Component } from "react";

class Textarea extends Component {
  render() {
    let { id, name, type, label, help, error, options, ...props } = this.props;

    return (
      <div class="form-group {error != '' && 'has-error'}">
        <label>{label}</label>
        <textarea
          id={id}
          name={name}
          class="form-control"
          onBlur={this.onBlur}
          {...props}
        >
        </textarea>

        {help && <p class="help-block">{help}</p>}
        {error && <p class="help-block">{error}</p>}
      </div>
    );
  }
}

export default Textarea;
