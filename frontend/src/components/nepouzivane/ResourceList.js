import React, { Component } from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MainSidebar } from "reactjs-admin-lte";
import { setResource } from "./../actions";

class ResourceList extends Component {
  render() {
    if(!this.props.resources) {
      return <div></div>
    }
    return (
      <MainSidebar.Menu>
        {this.props.resources.map(resource => {
          return (
            <MainSidebar.Menu.Item>
              <span className="glyphicon glyphicon-th-list" />{" "}
              <a onClick={() => this.props.setResource(resource)}>
                {resource}
              </a>
            </MainSidebar.Menu.Item>
          );
        })}
      </MainSidebar.Menu>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    resources: state.resources
  };
};
export default connect(mapStateToProps, { setResource })(ResourceList);
