const validateFormField = (value, props) => {
  var error = "";
  if (props.required && !value) {
    error = "Field is required";
  } else if (props.oneOf && !(value in props.oneOf)) {
    error = `Allowed values: ${props.oneOf}`;
  } else if (props.minLength && value.length < props.minLength) {
    error = `Min length: ${props.minLength}`;
  }
  return error;
};

export default validateFormField;
