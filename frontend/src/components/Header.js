import React, { Component } from "react";
import { Navbar, Collapse, Container } from "reactstrap";
import header from "./../assets/images/header.jpg";
import Menu from "./Menu";

class Header extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={header} alt="header" width="100%" />
        </div>
        <Navbar color="black" dark expand="md">
          <Collapse navbar>
            <Container>
              <Menu />
            </Container>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
