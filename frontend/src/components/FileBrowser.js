import React, { Component } from "react";
import "react-table/react-table.css";
import { connect } from "react-redux";
import { fetchFiles, setActiveDirectory } from "./../actions";
import axios from "axios";
import Field from "./Form/Field";
import FontAwesome from "react-fontawesome";
import { findByPath } from "./../Helpers/index";
import { Box } from "./Admin/AdminLte/AdminLte";

import {
  Card,
  CardBody,
  CardFooter,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import Form from "./Form/Form";

class FileBrowser extends Component {
  capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  componentDidMount() {
    const path = this.props.path;

    this.props.fetchFiles(path);
    this.props.setActiveDirectory(path);
  }

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      parent: null,
      chosenFile: null,
      showForm: false,
      fields: []
    };

    this.setActiveDirectory = this.setActiveDirectory.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.chooseFile = this.chooseFile.bind(this);
    this.processForm = this.processForm.bind(this);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  chooseFile(file) {
    this.setState({ showForm: true, fields: window.opener.params });
    this.setState({ chosenFile: file });
  }

  processForm(data) {
    window.opener.callback(this.state.chosenFile.src, data);
    window.self.close();
  }

  submitForm(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("path", this.props.activeDirectory.path);
    formData.append("uploadedFile", this.state.file);

    let url = this.props.baseUrl + "/upload";

    axios
      .post(url, formData)
      .then(result => {
        console.log(result);
        //this.props.fetchFiles(result.data.path);
        setActiveDirectory(result.data.path);
        this.uploadFile.value = null;
      })
      .catch(function(error) {
        console.log("server error", error);
      });
  }

  setActiveDirectory(path) {
    let directory = findByPath(this.props.files, path);
    this.props.setActiveDirectory(directory);
  }

  render() {
    if (!this.props.files) {
      //this.setActiveDirectory(props.files.path);
      return <div>no files</div>;
    }

    return (
      <Container fluid>
        <br />
        <Box className="box-primary">
          <Box.Header className="with-border">Media manager</Box.Header>
          <Box.Body>
            <Row>
              <Col md={3}>
                <DirectoryTree
                  data={this.props.files.children}
                  setDir={this.setActiveDirectory}
                />
                <br />
              </Col>
              <Col md={9}>
                <form
                  action=""
                  onSubmit={this.submitForm}
                  method="post"
                  encType="multipart/form-data"
                >
                  <div style={{ backgroundColor: "#F0F0F0", padding: "8px" }}>
                    <input
                      type="file"
                      name="myFile"
                      ref={input => (this.uploadFile = input)}
                      onChange={this.onChange}
                    />

                    <Button
                      type="submit"
                      color="success"
                      size="sm"
                      name="submit"
                      className="float-right"
                    >
                      <FontAwesome name="upload" /> Upload file
                    </Button>
                    <br />
                  </div>
                </form>
                <hr />
                <div className="flex-container">
                  {this.props.children.length > 0 || <p>Choose a directory</p>}
                  {this.props.children
                    .filter(f => f.type === "folder")
                    .map(dir => {
                      return (
                        <FilePreview
                          file={dir}
                          isDir={true}
                          action={() => this.setActiveDirectory(dir.path)}
                        />
                      );
                    })}

                  {this.props.children
                    .filter(f => f.type === "file")
                    .map(file => {
                      return (
                        <FilePreview
                          file={file}
                          isDir={false}
                          action={this.chooseFile}
                        />
                      );
                    })}
                </div>
              </Col>
            </Row>
          </Box.Body>
        </Box>

        <Modal isOpen={this.state.showForm}>
          <ModalHeader className="modal-header-success">
            Fill in data
          </ModalHeader>
          <ModalBody>
            <Form {...this.props} processForm={this.processForm}>
              {this.state.fields.map(field => {
                return (
                  <Field
                    key={field.name}
                    type={field.type || "text"}
                    label={this.capitalize(field.name)}
                    name={field.name}
                  />
                );
              })}
              <div className="float-right">
                <Button type="submit" size="lg" color="primary">
                  Save
                </Button>{" "}
                <Button size="lg" color="secondary">
                  Cancel
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

const FilePreview = ({ file, action, isDir }) => {
  const isImage = file.name.match(/.(jpg|jpeg|png|gif)$/i);
  const icon = isDir ? "fa-folder" : "fa-file-o";

  return (
    <Card>
      <CardBody>
        <a onClick={() => action(file)}>
          {isImage && <img alt={file.name} src={file.src} width="100%" />}
          {!isImage && <FontAwesome className={icon + " fa-4x"} />}
        </a>
      </CardBody>
      <CardFooter>{file.name}</CardFooter>
    </Card>
  );
};

const DirectoryTree = ({ data, setDir }) => {
  return data.filter(file => file.type === "folder").map(folder => {
    let data = (
      <div key={folder.path} style={{ marginLeft: "10px" }}>
        <Button color="link" onClick={() => setDir(folder.path)}>
          <FontAwesome name="folder" className="fa-folder" /> {folder.name}
        </Button>

        {folder.children && (
          <DirectoryTree data={folder.children} setDir={setDir} />
        )}
      </div>
    );
    return data;
  });
};

const mapStateToProps = (state, ownProps) => {
  let children = state.activeDirectory.children || [];

  return {
    children,
    activeDirectory: state.activeDirectory,
    files: state.files,
    baseUrl: state.baseUrl
  };
};
export default connect(mapStateToProps, {
  fetchFiles,
  setActiveDirectory
})(FileBrowser);
