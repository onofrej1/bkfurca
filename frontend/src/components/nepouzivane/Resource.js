import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setActiveResourceName,
  fetchResourceData,
  setActiveRow,
  setResourceRow
} from "./../../actions";
import List from "./List";
import ResourceForm from "./ResourceForm";
import { Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import actionButtons from "./actionButtons";
import FontAwesome from "react-fontawesome";
import { Content, Box } from "reactjs-admin-lte";
import axios from "axios";

class Resource extends Component {
  constructor(props) {
    super(props);
    this.getDefaultColumns = this.getDefaultColumns.bind(this);
    this.processForm = this.processForm.bind(this);
  }

  processForm(data) {
    let urlParam = data.id ? "/" + data.id : "";
    //console.log(data);
    //data.tags = [3,5,7];
    axios({
      method: data.id ? "put" : "post",
      url: this.props.resourceBaseUrl + "/" + this.props.name + urlParam,
      data
    }).then(result => {
      this.props.setActiveRow(null);
      const updatedRow = result.data instanceof Array ? result.data[0]: result.data;
      this.props.setResourceRow(this.props.name, updatedRow);
    });
  }

  render() {
    const { activeResource, name } = this.props;

    const CustomForm = this.props.form;
    const config = this.props.config;
    const columns = this.props.columns || this.getDefaultColumns();

    return (
      <Row>
        <Col md={12}>
          <Box className="box-primary">
            <Box.Header className="with-border">
              <Box.Title>{this.props.name}</Box.Title>{' '}
              <button className="my-btn" onClick={() => this.props.setActiveRow({})}>
                <FontAwesome name="plus-square-o" /> Add new
              </button>
            </Box.Header>
            <Box.Body>
              <Modal
                isOpen={this.props.activeRow !== null}
                className="modal-lg"
              >
                <ModalHeader
                  className="modal-header-primary"
                  toggle={() => this.props.setActiveRow(null)}
                >
                  <FontAwesome name="pencil-square" /> {activeResource.name}
                </ModalHeader>
                <ModalBody>
                  {CustomForm ? (
                    <CustomForm
                      model={this.props.activeRow}
                      processForm={this.processForm}
                      callback={this.afterSave}
                    />
                  ) : (
                    <ResourceForm
                      model={this.props.activeRow}
                      processForm={this.processForm}
                      callback={this.afterSave}
                    />
                  )}
                </ModalBody>
              </Modal>
              <List
                columns={columns}
                resources={this.props.resources}
                {...this.props}
              />
            </Box.Body>
          </Box>
        </Col>
      </Row>
    );
  }

  getDefaultColumns = () => {
    let columns = [];
    let dbColumns = this.props.activeResource.columns;
    //console.log(dbColumns);
    for (let key in dbColumns) {

      columns.push({
        header: key,
        field: key
        //filter: dbColumns[i] !== "id"
      });
    }
    columns.push(actionButtons);

    return columns;
  };
}

const mapStateToProps = (state, ownProps) => {
  let activeResource = state.resources[state.activeResourceName];

  return {
    activeResource,
    activeRow: state.activeRow,
    resources: state.resources,
    resourceBaseUrl: state.resourceBaseUrl
  };
};

export default connect(mapStateToProps, {
  setActiveResourceName,
  setResourceRow,
  fetchResourceData,
  setActiveRow
})(Resource);
