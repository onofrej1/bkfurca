import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchResourceData, setActiveRow } from "./../actions/index";
import DataTable from "./DataTable";
import axios from "axios";
import { Button, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import actionButtons from "./Admin/actionButtons";
import FontAwesome from "react-fontawesome";
import { Box } from "./Admin/AdminLte/AdminLte";
import Form from "./Form/Form";
import Field from "./Form/Field";

class ResultsAdmin extends Component {
  static defaultProps = {
    events: []
  };

  componentDidMount() {
    this.props.fetchResourceData("event");
  }

  constructor(props) {
    super(props);
    this.state = { eventId: null, results: [] };
    this.reloadData = this.reloadData.bind(this);
    this.getResults = this.getResults.bind(this);
    this.processForm = this.processForm.bind(this);
  }

  getResults(eventId) {
    this.setState({ eventId });
    const url = this.props.baseUrl + "/results/" + eventId;
    axios.get(url).then(
      result => {
        this.setState({ results: result.data });
      },
      error => console.log(error)
    );
  }

  reloadData() {
    this.props.setActiveRow(null);
    this.getResults(this.state.eventId);
  }

  processForm(data) {
    let urlParam = data.id ? "/" + data.id : "";
    axios({
      method: data.id ? "put" : "post",
      url: this.props.apiUrl + "/result" + urlParam,
      data
    }).then(result => {
      this.reloadData();
    });
  }

  render() {
    let { events } = this.props;

    let columns = [
      {
        header: "Place",
        field: "place"
      },
      {
        header: "Category",
        field: "category"
      },
      {
        header: "Name",
        Cell: props => (
          <span>
            {props.row.Runner.last_name} {props.row.Runner.first_name}
          </span>
        )
      },
      {
        header: "Team",
        field: "team"
      },
      {
        header: "Time",
        field: "finish_time"
      },
      actionButtons
    ];

    return (
      <div>
        <Row>
          <Col md={12}>
            <Box className="box-primary">
              <Box.Header className="with-border">
                Results
                <Button
                  size="sm"
                  className="float-right"
                  outline
                  onClick={() =>
                    this.props.setActiveRow({ event_id: this.state.eventId })
                  }
                >
                  <FontAwesome name="plus-square-o" /> Add new
                </Button>
              </Box.Header>
              <Box.Body>
                <p>
                  Vyberte podujatie:
                  <select
                    name="event_id"
                    onChange={e => this.getResults(e.target.value)}
                  >
                    <option value="" />
                    {events &&
                      events.map(event => {
                        return (
                          <option key={event.id} value={event.id}>
                            {event.edition}.r {event.title}
                          </option>
                        );
                      })}
                  </select>
                </p>
                <DataTable
                  columns={columns}
                  data={this.state.results}
                  edit={this.props.setActiveRow}
                  sortBy="place"
                />
                <Modal
                  isOpen={this.props.activeRow !== null}
                  className="modal-lg"
                >
                  <ModalHeader
                    className="modal-header-primary"
                    toggle={() => this.props.setActiveRow(null)}
                  >
                    <FontAwesome name="pencil-square" /> Add/Edit
                  </ModalHeader>
                  <ModalBody>
                    <ResultsForm
                      model={this.props.activeRow}
                      processForm={this.processForm}
                      callback={this.reloadData}
                      cancel={() => this.props.setActiveRow(null)}
                    />
                  </ModalBody>
                </Modal>
              </Box.Body>
            </Box>
          </Col>
        </Row>
      </div>
    );
  }
}

const ResultsForm = props => {
  return (
    <Form url={props.url} {...props} addButtons>
      <Field type="hidden" name="id" value="null" />
      <Field
        component="relation"
        name="runner_id"
        resourceTable="runner"
        render={props => (
          <option key={props.row.id} value={props.row.id}>
            {props.row.last_name} {props.row.first_name}
          </option>
        )}
      />
      <Field type="number" label="Place" name="place" required />
      <Field type="text" label="Category" name="category" required />
      <Field type="text" label="Team" name="team" required />
      <Field type="text" label="Finish time" name="finish_time" required />
    </Form>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    apiUrl: state.apiUrl,
    activeRow: state.activeRow,
    baseUrl: state.baseUrl,
    events: state.resourceData.event
  };
};

export default connect(mapStateToProps, { fetchResourceData, setActiveRow })(
  ResultsAdmin
);
