import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import FontAwesome from "react-fontawesome";

class Form extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = { form: props.model || {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  handleChange(event) {
    console.log(event);
    this.setFormState(event.target);
  }

  setValue(name, value) {
    let form = Object.assign({}, this.state.form);
    form[name] = value;
    this.setState({ form });

    console.log(this.state.form);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.url) {
      axios.post(this.props.url, this.state.form).then(result => {
        this.setState({ form: {} });
      });
    }

    if (this.props.processForm) {
      this.props.processForm(this.state.form);
      this.setState({ form: {} });
    }
  }

  setFormState = element => {
    var value = element.value || null;

    if (element.type === "select-multiple") {
      value = this.getOptionValues(element.selectedOptions);
    }

    if (element.type === "checkbox") {
      var values = this.state.form[element.name] || [];
      value = element.checked
        ? [...values, element.value]
        : values.filter(v => v !== element.value);
    }

    this.setValue(element.name, value);
  };

  getOptionValues = options => {
    var values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    return values;
  };

  render() {
    let { cancel, formType } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        {React.Children.map(this.props.children, (field, index) => {
          let value = this.state.form[field.props.name] || '';

          return field ? (
            <div>
              {React.cloneElement(field, {
                value,
                formType,
                onChange: this.handleChange,
                model: this.state.form,
                setValue: this.setValue
              })}
            </div>
          ) : null;
        })}
        {this.props.addButtons && (
          <div className="float-right">
            <Button type="submit" color="primary">
              <FontAwesome name="save" /> Save & close
            </Button>{" "}
            <Button color="secondary" onClick={cancel} outline>
              <FontAwesome name="times" /> Cancel
            </Button>
          </div>
        )}
      </form>
    );
  }
}

export default Form;
