import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "./Form/Form";
import { login } from "./../actions/index";
import {
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Card,
  CardBody,
  Row,
  Col,
  Button
} from "reactstrap";
import FontAwesome from "react-fontawesome";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  static defaultProps = {
    events: { data: [] }
  };

  login(values) {
    this.props.login(values.email, values.password);
  }

  render() {
    if (this.props.user) {
      this.props.history.push("/");
    }

    return (
      <Row>
        <Col md={{ size: 4, offset: 4 }}>
          <br />
          <Card style={{ backgroundColor: "#F8F8F8" }}>
            <CardBody>
              <Form processForm={this.login}>
                <InputGroup>
                  <Input name="email" placeholder="Email" type="text" />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <FontAwesome name="envelope" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <br />
                <InputGroup>
                  <Input name="password" placeholder="Password" type="text" />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <FontAwesome name="key" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <br />
                <Button
                  type="submit"
                  className="float-right"
                  block
                  color="primary"
                  name="login"
                >
                  <FontAwesome name="login" /> Login
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

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { login })(Login);
