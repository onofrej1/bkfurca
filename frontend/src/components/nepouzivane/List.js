import React, { Component } from "react";
import "react-table/react-table.css";
import DataTable from "./../DataTable";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { setActiveRow, deleteResourceRow } from "./../../actions";
import FontAwesome from "react-fontawesome";

class List extends Component {
  render() {
    let { columns, data, ...rest } = this.props;

    if (!data) {
      return <div />;
    }

    return (
      <div>      
        <DataTable
          columns={columns}
          data={data}
          edit={this.props.setActiveRow}
          remove={this.props.deleteResourceRow}
          {...rest}
          /*SubComponent={({row}) => {
            return <div>{row.email}<br/>{row.message}</div>;
          }}*/
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let data = state.resources[state.activeResourceName].data;

  return {
    data,
    activeResourceName: state.activeResourceName
  };
};

export default connect(mapStateToProps, {
  setActiveRow, deleteResourceRow
})(List);
