import React, { Component } from "react";
import { connect } from "react-redux";

class Datagrid extends Component {

  static defaultProps = {
    resource: { data: [] }
  };

  render() {
    var { children } = this.props;

    return (
      <div>
        <table className="table table-stripped">
          <thead>
            <tr className="bg-primary">
              {React.Children.map(
                children,
                (field, index) =>
                  field ? <th key="{now()}">{field.props.source}</th> : null
              )}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.resource.data &&
              this.props.resource.data.map((row, i) => (
                <tr key={Math.random()}>
                  {React.Children.map(
                    children,
                    (field, index) =>
                      field ? (
                        <td key="{now()}">
                          {React.cloneElement(field, {
                            value: row[field.props.source]
                          })}
                        </td>
                      ) : null
                  )}
                  <td>
                    <a
                      onClick={() => this.props.edit(row)}
                      className="btn btn-default"
                    >
                      <span className="glyphicon glyphicon-pencil" />
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    resource: state.resource
  };
};

export default connect(mapStateToProps, null)(Datagrid);
