import React, { Component } from "react";
import "admin-lte/dist/css/AdminLTE.css";
import "admin-lte/dist/css/skins/_all-skins.css";
import "admin-lte/dist/js/adminlte.js";
import Navbar from "./AdminLte/Navbar";
import { connect } from "react-redux";
import { Button, Row, Col } from "reactstrap";
import Home from "./../Home";
import FontAwesome from "react-fontawesome";
import FileBrowser from './../FileBrowser';
import ResultsAdmin from "./../ResultsAdmin";
import models from './CrudModels';
import Crud from './Crud';
import {
  fetchFiles,
  setActiveRow,
  setActiveResourceName,
  setResource,
  fetchResourceData,
  fetchResourceColumns,
  setResourceUrl
} from "./../../actions";

import {
  Layout,
  Box,
  Content,
  MainSidebar,
  MainHeader
} from "reactjs-admin-lte";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.setResourceUrl(props.baseUrl);

    React.Children.forEach(props.children, function(child) {
      props.setResource({ name: child.props.name, title: child.props.title, visible: true });
    });
    this.setResource = this.setResource.bind(this);
    this.setContent = this.setContent.bind(this);
  }

  setContent(Component) {
    this.setState({ content: Component });
  }

  setResource(name) {
    this.props.setActiveResourceName(name);
    this.props.fetchResourceData(name);
    this.props.fetchResourceColumns(name);

    //let com = this.props.children.find(p => p.props.name == name);<
    const crud = <Crud name={name} />;
    this.setState({ content: crud });
  }

  render() {
    let { children } = this.props;
    //let names = Object.keys(this.props.resources).filter(name => this.props.resources[name].visible == true);
    const names = Object.keys(models);

    let ResultsAdminComponent = <ResultsAdmin />;
    let MediaComponent = <FileBrowser path="./assets/media" />;

    return (
      <Layout skin="blue" type="fixed">
        <MainHeader>
          <MainHeader.Logo>O5 BK Furča</MainHeader.Logo>
          <Navbar />
        </MainHeader>
        <MainSidebar>
          <MainSidebar.Menu.Header />
          <MainSidebar.Menu>
            <li className="header">MENU</li>
            <li>
              <a
                style={{ color: "white" }}
                onClick={() => this.setContent(ResultsAdminComponent)}
              >
                <FontAwesome name="list" className="fa-th-list" /> Vysledky
              </a>
            </li>
            <li>
              <a
                style={{ color: "white" }}
                onClick={() => this.setContent(MediaComponent)}
              >
                <FontAwesome name="list" className="fa-th-list" /> Media manager
              </a>
            </li>
            {names.length > 0 &&
              names.map(name => {
                return (
                  <li key={name}>
                    <a
                      style={{ color: "white" }}
                      onClick={() => this.setResource(name)}
                    >
                      <FontAwesome name="list" className="fa-th-list" />{" "}
                      {models[name].title}
                    </a>
                  </li>
                );
              })}
          </MainSidebar.Menu>
          {/*<MainSidebar.UserPanel>user panel</MainSidebar.UserPanel>*/}
        </MainSidebar>
        <Content>
          <Content.Header />
          <Content.Body>{this.state.content}</Content.Body>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeResourceName: state.activeResourceName,
    resources: state.resources
  };
};
export default connect(mapStateToProps, {
  fetchFiles,
  setActiveRow,
  setResource,
  fetchResourceData,
  fetchResourceColumns,
  setActiveResourceName,
  setResourceUrl
})(Admin);
