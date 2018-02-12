import React, { Component } from "react";
import { connect } from "react-redux";
import { setResource, setResourceUrl, setResources } from "./../../actions";
import { Box } from "reactjs-admin-lte";

class Crud extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    activeResource: {}
  };

  render() {
    let { baseUrl, children } = this.props;

    let resources = [];
    React.Children.forEach(children, function(child) {
      resources.push(child.props.name);
    });
    this.props.setResourceUrl(baseUrl);
    if(this.props.resources.length == 0) {
      this.props.setResources(resources);
    }

    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <Box className="box-primary">
            <Box.Header className="with-border">
              <Box.Title>{this.props.resource.name}</Box.Title>
            </Box.Header>
            <Box.Body>
              {React.Children.map(
                children,
                (resource, index) =>
                  resource.props.name == this.props.resource.name
                    ? React.cloneElement(resource, {
                        baseUrl
                      })
                    : null
              )}
            </Box.Body>
          </Box>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    resource: state.resource,
    resources: state.resources
  };
};
export default connect(mapStateToProps, { setResourceUrl, setResources })(Crud);
