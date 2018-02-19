import React, { Component } from "react";
import { Table } from "reactstrap";
import DataTablePager from "./DataTablePager";
import FontAwesome from "react-fontawesome";

let _ = require("underscore");

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      page: 1,
      sortBy: this.props.sortBy || "id",
      sortDir: "asc",
      rowChildren: {},
      filter: {}
    };

    this.sort = this.sort.bind(this);
    this.filter = this.filter.bind(this);
    this.getData = this.getData.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setPageSize = this.setPageSize.bind(this);
    this.toggleSubComponent = this.toggleSubComponent.bind(this);
  }

  getData() {
    let data = _.sortBy(this.props.data, this.state.sortBy);

    data = data.filter(row => {
      let show = true;

      _.keys(row).forEach(col => {
        if (this.state.filter[col]) {
          let value = row[col] || "";
          if (value.indexOf(this.state.filter[col]) === -1) {
            show = false;
          }
        }
      });
      return show;
    });

    data = this.state.sortDir === "asc" ? data : data.reverse();

    let pagedData = data.slice(
      (this.state.page - 1) * this.state.pageSize,
      this.state.page * this.state.pageSize
    );

    return this.props.data.length > 1 ? pagedData : data;
  }

  sort(sortBy) {
    this.setState({
      sortBy,
      sortDir: this.state.sortDir === "asc" ? "desc" : "asc"
    });
  }

  toggleSubComponent(id) {
    let childRow = this.state.rowChildren;
    childRow[id] = !childRow[id];
    this.setState({ childRow });
  }

  filter(column, event) {
    let filter = this.state.filter;
    filter[column] = event.target.value;
    this.setState({ filter });
  }

  setPage(page) {
    this.setState({ page });
  }

  setPageSize(pageSize) {
    this.setState({ pageSize });
  }

  render() {
    if (this.props.data.length === 0) return <div />;

    let { columns, tdProps, trProps, edit, SubComponent, ...rest } = this.props;
    let pages = Math.ceil(this.props.data.length / this.state.pageSize);

    if (this.state.page > pages) {
      this.setState({ page: pages });
    }

    let data = this.getData();

    return (
      <div>
        <Table size="sm" striped>
          <thead>
            <tr className="adminBgColor">
              {SubComponent && <th />}
              {columns.map(column => {
                return (
                  <th
                    key={"header" + column.header}
                    onClick={() => this.sort(column.field)}
                  >
                    {column.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.showFilter && (
              <tr>
                {SubComponent && <td />}
                {columns.map(column => {
                  return (
                    <td
                      key={"filter" + column.header}
                      onClick={() => this.sort(column.field)}
                    >
                      {column.filter &&
                        column.field !== "id" && (
                          <input
                            type="text"
                            value={this.state.filter[column.header]}
                            onChange={e => this.filter(column.field, e)}
                            className="form-control"
                          />
                        )}
                    </td>
                  );
                })}
              </tr>
            )}
            {data.map(row => {
              let trAttrs = typeof trProps === "function" && trProps(row);
              let toggleIcon = this.state.rowChildren[row.id]
                ? "fa-minus-square"
                : "fa-plus-square";

              return [
                <tr key={row.id} {...trAttrs}>
                  {SubComponent ? (
                    <td>
                      <FontAwesome
                        className={toggleIcon}
                        onClick={this.toggleSubComponent.bind(this, row.id)}
                      />
                    </td>
                  ) : null}
                  {columns.map(column => {
                    let value;
                    let tdAttrs =
                      typeof tdProps === "function" && tdProps(row, column);

                    if ("Cell" in column) {
                      value = (
                        <column.Cell
                          row={row}
                          tdProps={tdAttrs}
                          edit={edit}
                          {...rest}
                        />
                      );
                    } else {
                      value = (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: row[column.field]
                          }}
                        />
                      );
                    }

                    return (
                      <td key={row.id + "-" + column.header} {...tdAttrs}>
                        {value}
                      </td>
                    );
                  })}
                </tr>,
                SubComponent ? (
                  <tr
                    key={"sub" + row.id}
                    style={{
                      display: this.state.rowChildren[row.id]
                        ? "table-row"
                        : "none"
                    }}
                  >
                    <td colspan={columns.length}>
                      <SubComponent row={row} />
                    </td>
                  </tr>
                ) : null
              ];
            })}
            {/*<tr>
              {columns.map(column => {
                if ("Footer" in column) {
                  return (
                    <td key={"footer" + column.field}>
                      <column.Footer data={this.props.data} />
                    </td>
                  );
                } else {
                  return <td key={"footer" + column.field} />;
                }
              })}
            </tr>*/}
          </tbody>
        </Table>

        <DataTablePager
          currentPage={this.state.page}
          pages={[pages]}
          setPage={this.setPage}
          setPageSize={this.setPageSize}
        />
      </div>
    );
  }
}

export default DataTable;
