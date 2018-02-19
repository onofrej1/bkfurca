import React, { Component } from "react";
import { connect } from "react-redux";

class CKEditor extends Component {
  constructor(props) {
    super(props);
    this.elementName = this.props.name;
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  render() {
    return (
        <textarea name={this.elementName} defaultValue={this.props.value} />
    );
  }

  componentDidMount() {
    let configuration = {
      toolbar: "Basic",
      height: 500,
      baseUrl: this.props.baseUrl,
      extraPlugins: "imgbrowser,iframe",
      extraAllowedContent:
        "img(img-thumbnail);object[id,name,width,height,data,type]; param[name,value];iframe[src,width,height];table(table,table-striped)"
    };
    window.CKEDITOR.replace(this.elementName, configuration);
    window.CKEDITOR.instances[this.elementName].on(
      "change",
      function(e) {
        let value = window.CKEDITOR.instances[this.elementName].getData();
        this.props.setValue(this.props.name, value);
      }.bind(this)
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    baseUrl: state.appUrl,
  };
};

export default connect(mapStateToProps, {  })(CKEditor);
