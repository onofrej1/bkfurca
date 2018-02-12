import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from "react-fontawesome";
import FileBrowser from "./../FileBrowser";
import ResultsAdmin from "./../ResultsAdmin";
import models from "./CrudModels";
import Crud from "./Crud";
import {
  fetchFiles,
  setActiveRow,
  setActiveResourceName,
  setResource,
  fetchResourceData,
  fetchResourceFields,
  setResourceUrl
} from "./../../actions";

import { Layout, Content, Sidebar, Header, Footer } from "./AdminLte/AdminLte";

const ResourcesMenu = ({ names, setResource }) => {
  return (
    (names.length > 0 &&
      names.map(name => {
        return (
          <li key={name}>
            <a onClick={() => setResource(name)}>
              <FontAwesome name="list" className="fa-th-list" />{" "}
              {models[name].title}
            </a>
          </li>
        );
      })) || <span />
  );
};

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.setResourceUrl(props.baseUrl);

    React.Children.forEach(props.children, function(child) {
      props.setResource({
        name: child.props.name,
        title: child.props.title,
        visible: true
      });
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
    this.props.fetchResourceFields(name);

    const crud = <Crud name={name} />;
    this.setState({ content: crud });
  }

  render() {
    const names = Object.keys(models);

    const Results = <ResultsAdmin />;
    const MediaComponent = <FileBrowser path="./public/media" />;

    return (
      <Layout>
        <Header>
          <Header.Logo>O5 BK Furca</Header.Logo>
          <Header.Navbar />
        </Header>
        <Sidebar>
          <Sidebar.Menu>
            <Sidebar.Menu.Header>MAIN NAVIGATION</Sidebar.Menu.Header>
            <li>
              <a onClick={() => this.setContent(MediaComponent)}>
                <FontAwesome name="list" className="fa-th-list" /> Media manager
              </a>
            </li>
            <li>
              <a onClick={() => this.setContent(Results)}>
                <FontAwesome name="list" className="fa-th-list" /> Results
              </a>
            </li>
            <ResourcesMenu names={names} setResource={this.setResource} />
          </Sidebar.Menu>
        </Sidebar>

        <Content>
          <Content.Header />
          <Content.Body>{this.state.content}</Content.Body>
        </Content>

        <Footer />
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
  fetchResourceFields,
  setActiveResourceName,
  setResourceUrl
})(Admin);
