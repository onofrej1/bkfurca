import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-static-top">
        {this.props.children}
      </nav>
    );
  }
}
