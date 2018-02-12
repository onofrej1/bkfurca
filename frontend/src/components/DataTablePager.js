import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const DataTablePager = ({ currentPage, pages, setPage, setPageSize }) => {
  return (
    <Row
      style={{ lineHeight: "15px", padding: 2, border: "0px solid lightgray" }}
    >
      <Col md={3}>
        <Button size="sm" block onClick={() => setPage(currentPage - 1)}>
          Previous
        </Button>
      </Col>
      <Col md={3} className="text-center text-nowrap">
        Page{" "}
        <input
          type="number"
          className="form-control-sm"
          min="1"
          name="page"
          value={currentPage}
          onChange={e => setPage(e.target.value)}
        />{" "}
        of {pages}
      </Col>
      <Col md={3} className="text-center text-nowrap">
        Rows{" "}
        <select
          name="pageSize"
          className="form-control-sm"
          onChange={e => setPageSize(e.target.value)}
        >
          <option value="10">10</option>
          <option value="20" selected>20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </Col>
      <Col md={3}>
        <Button size="sm" block onClick={() => setPage(currentPage + 1)}>
          Next
        </Button>
      </Col>
    </Row>
  );
};

export default DataTablePager;
