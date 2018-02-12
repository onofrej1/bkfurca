import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class SidebarLayout extends Component {
  render() {
    let { contentTitle } = this.props;

    return (
      <Container>
        <br/>
        <Row>
          <Col md={8}>
            <div className="box-stripe">
              <div className="box-stripe-heading">{contentTitle}</div>
              {this.props.children}
            </div>
          </Col>
          <Col md={4}>
            <div className="box-stripe">
              <div className="box-stripe-heading">Aktuality</div>
              aktuality
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SidebarLayout;
