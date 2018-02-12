import React, { Component } from "react";
import { connect } from "react-redux";
import Field from "./Form/Field";
import Form from "./Form/Form";
import { register } from "./../actions/index";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import FontAwesome from "react-fontawesome";

class Register extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  signUp(values) {
    this.props.register(values.name, values.email, values.password);
  }

  render() {
    return (
      <Row>
        <Col md={{ size: 4, offset: 4 }}>
          <br />
          <Card style={{ backgroundColor: "#F8F8F8" }}>
            <CardBody>
              <Form processForm={this.signUp}>
                <Field name="name" label="Name" />
                <Field name="email" label="Email" />
                <Field name="password" label="Password" />
                <br />
                <Button
                  type="submit"
                  className="float-right"
                  block
                  color="primary"
                  name="login"
                >
                  Sign up <FontAwesome name="angle-double-right" />
                </Button>
              </Form>
              <br />
            </CardBody>
          </Card>
          <br />
        </Col>
      </Row>
    );
  }
}

export default connect(null, { register })(Register);
