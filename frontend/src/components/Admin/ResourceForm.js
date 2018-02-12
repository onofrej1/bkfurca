import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "./../Form/Form";
import Field from "./../Form/Field";
import { Button } from "reactstrap";

class ResourceForm extends Component {
  render() {
    let dbColumns = this.props.activeResource.columns;

    return (
      <Form {...this.props} addButtons>
        {dbColumns.map(column => {
          return (
            <Field
              key={column}
              type={column === "id" ? "hidden" : "text"}
              label={column}
              name={column}
            />
          );
        })}
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let activeResource =state.resources[state.activeResourceName];

  return {
    //resources: state.resources,
    activeResource
  };
};

export default connect(mapStateToProps, null)(ResourceForm);
