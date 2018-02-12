import React, { Component } from "react";
import CheckboxList from './CheckboxList';
import RadioList from './RadioList';
import validateFormField from './validateFormField';

class FieldOld extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(e) {
    var error = validateFormField(e.target.value, this.props);
    this.setState({ error: error });
    console.log(this.odkaz.value);
  }

  render() {
    let { id, label, name, type, help, children, ...props } = this.props;

    if (type == "checkboxList") {
      return <CheckboxList name={name} label={label} data={this.props.data} onBlur={this.onBlur} {...props} />;
    }

    if (type == "radioList") {
      return <RadioList name={name} label={label} data={this.props.data} onBlur={this.onBlur} {...props} />;
    }

    if (type == "submit") {
      return <button type="submit" {...props}>{label}</button>;
    }

    return (
      <div class="form-group {this.state.error != '' && 'has-error'}">
        <label>{label}</label>
        {type != "textarea" && (
          <input
            type={type}
            name={name}
            class="form-control"
            onBlur={this.onBlur}
            ref={nameInput => this.odkaz = nameInput}
            {...props}
          />
        )}
        {type == "textarea" && (
          <textarea
            name={name}
            class="form-control"
            onBlur={this.onBlur}
            {...props}
          />
        )}
        {help && <p class="help-block">{help}</p>}
        {this.state.error && <p class="help-block">{this.state.error}</p>}
      </div>
    );
  }
}

export default FieldOld;
