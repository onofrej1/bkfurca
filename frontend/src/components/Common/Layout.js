import React, { Component } from "react";
//import main from "./../../assets/css/main.css";
import { Container, Row, Col } from "reactstrap";

class Layout extends Component {
  render() {
    let { contentTitle } = this.props;
    
    return (
      <Container>
        <br/>
        <Row>
          <Col md={12}>
            <div className="box-stripe">
              <div className="box-stripe-heading">{contentTitle}</div>
              {this.props.children}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Layout;
