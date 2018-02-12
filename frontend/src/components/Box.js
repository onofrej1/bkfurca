import React, { Component } from "react";

class Box extends Component {
  render() {
    return (
        <div className="content-box">
          <div className="box-heading">Heading</div>
            {this.props.children}
        </div>
    );
  }
}

export default Box;
