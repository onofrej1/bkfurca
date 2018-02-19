import React, { Component } from "react";
import validateFormField from "./validateFormField";
import {
  Input,
  Select,
  Textarea,
  RadioList,
  CheckboxList,
  Checkbox
} from "./FormFields";
import RelationField from "./RelationField";
import PivotField from "./PivotField";
import "input-moment/dist/input-moment.css";
import MomentInput from 'react-moment-input';
import CKEditor from "./CKEditor";
import moment from "moment";

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onBlur = this.onBlur.bind(this);
    this.handleMomentInput = this.handleMomentInput.bind(this);
  }

  handleMomentInput(value) {
    console.log(value);
    const val = value.format("YYYY-MM-DD h:mm:ss");
    this.props.setValue(this.props.name, val);
  }

  onBlur(e) {
    var error = validateFormField(e.target.value, this.props);
    this.setState({ error: error });
  }

  render() {
    let {
      label,
      help,
      error,
      component,
      setValue,
      formType,
      ...props
    } = this.props;
    let FormInput = <div />;

    component = component || props.type;

    switch (component) {
      case "checkbox":
        FormInput = <Checkbox onBlur={this.onBlur} {...props} />;
        break;
      case "checkboxList":
        FormInput = <CheckboxList onBlur={this.onBlur} {...props} />;
        break;
      case "radioList":
        FormInput = (
          <RadioList onBlur={this.onBlur} error={this.state.error} {...props} />
        );
        break;
      case "select":
        FormInput = (
          <Select onBlur={this.onBlur} error={this.state.error} {...props} />
        );
        break;
      case "relation":
        FormInput = (
          <RelationField onBlur={this.onBlur} setValue={setValue} {...props} />
        );
        break;
      case "pivotRelation":
        FormInput = (
          <PivotField onBlur={this.onBlur} setValue={setValue} {...props} />
        );
        break;
      case "textarea":
        FormInput = <Textarea onBlur={this.onBlur} {...props} />;
        break;
      case "datetime":
        FormInput = (
          <MomentInput

            defaultValue={moment(this.props.model[this.props.name])}
            onBlur={this.onBlur}
            onChange={this.handleMomentInput}
          />
        );
        break;
      case "ckeditor":
        FormInput = (
          <CKEditor onBlur={this.onBlur} setValue={setValue} {...props} />
        );
        break;
      default:
        FormInput = <Input onBlur={this.onBlur} {...props} />;
    }

    if (!label) {
      return FormInput;
    }

    if (formType === "grid") {
      return (
        <div class="form-group row">
          <label for={props.name} class="col-sm-2 col-form-label">
            {label}
          </label>
          <div class="col-sm-10">{FormInput}</div>
        </div>
      );
    }

    return (
      <div className="form-group">
        {props.type !== "hidden" && <label>{label}</label>}
        {FormInput}
        {help && <p class="help-block">{help}</p>}
        {error && <p class="help-block">{error}</p>}
      </div>
    );
  }
}

export default Field;
