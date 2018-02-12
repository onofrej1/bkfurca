import React, { Component } from "react";
import "react-table/react-table.css";
import { connect } from "react-redux";
import { fetchFiles, fetchTree, setDirectory } from "./../actions";
import SidebarLayout from "./Common/SidebarLayout";
import axios from "axios";
let _ = require("underscore");

class FileManager extends Component {
  static defaultProps = {
    tree: {},
    directory: { files: [] }
  };

  componentDidMount() {
    //this.props.fetchFiles();
    this.props.fetchTree();
    console.log("tree", this.props.tree);
  }

  constructor(props) {
    super(props);
    this.state = { file: null };
    this.setDirectory = this.setDirectory.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  submitForm(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("dir", this.props.directory.name);
    formData.append("ufile", this.state.file);

    console.log(formData);
    let url = "http://localhost/web/blog/public/upload";

    axios
      .post(url, formData)
      .then(result => {
        console.log(result.data);
        this.props.setDirectory(this.props.directory);
      })
      .catch(function(error) {
        console.log("server error", error);
      });
  }

  search(dir, val) {
    let that = this;
    let directory = _.findWhere(dir, { name: val });

    if (!directory) {
      _.each(dir, function(tempDir) {
        if (tempDir.dirs) directory = that.search(tempDir.dirs, val);
      });
    }

    return directory;
  }

  setDirectory(dirName) {
    let directory = this.search([this.props.tree], dirName);
    this.props.setDirectory(directory);
  }

  render() {
    let { ...props } = this.props;

    //let files = props.files;
    let tree = props.tree;
    let directory = props.directory;
    let parent = this.search([this.props.tree], directory.parent);

    if (!directory.name) {
      this.props.setDirectory(this.props.tree);
      return <div />;
    }

    return (
      <SidebarLayout>
        <div>
          <form
            action="upload.php"
            onSubmit={this.submitForm}
            method="post"
            enctype="multipart/form-data"
          >
            Select file to upload:
            <input type="file" name="ufile" onChange={this.onChange} />
            <input type="submit" value="Upload Image" name="submit" />
          </form>
          <a
            href="#"
            onClick={() => this.setDirectory(this.props.directory.parent)}
            className="pull-right"
          >
            UP
          </a>
        </div>
        <table className="table table-stripped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {directory.dirs &&
              directory.dirs.map(dir => {
                return (
                  <tr>
                    <td>
                      <a href="#" onClick={() => this.setDirectory(dir.name)}>
                        open {dir.name}
                      </a>
                    </td>
                    <td>{dir.src}</td>
                  </tr>
                );
              })}

            {directory.files &&
              this.props.directory.files.map(file => {
                return (
                  <tr>
                    <td>
                      {" "}
                      File {file.name}
                    </td>
                    <td>{file.filesize} bytov</td>
                    <td>
                      <a href={file.src} target="_blank" download>
                        Download
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </SidebarLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  return {
    files: state.files,
    tree: state.tree,
    directory: state.directory
  };
};
export default connect(mapStateToProps, {
  fetchFiles,
  fetchTree,
  setDirectory
})(FileManager);
