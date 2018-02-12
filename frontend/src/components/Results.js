import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchResourceData } from "./../actions/index";
import axios from "axios";
import Layout from "./Common/Layout";
import DataTable from "./DataTable";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [], events: [] };
    this.getEvents = this.getEvents.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  static defaultProps = {
    events: { data: [] }
  };

  getEvents(runId) {
    let events = this.props.events.data;
    events = events.filter(event => event.run_id === parseInt(runId, 10));
    this.setState({ events });
    this.setState({ results: [] });
  }

  getResults(eventId) {
    const url = this.props.baseUrl + "/results/" + eventId;
    axios.get(url).then(
      result => {
        this.setState({ results: result.data });
      },
      error => console.log(error)
    );
  }

  componentDidMount() {
    this.props.fetchResourceData("event");
  }

  render() {
    if (!this.state.events) {
      return <div />;
    }

    let columns = [
      { header: "Poradie", field: "place" },
      {
        header: "Meno",
        field: "lname",
        Cell: props => (
          <div>
            {props.row.person.fname} {props.row.person.lname}
          </div>
        )
      },
      { header: "Team", field: "team" },
      { header: "Cas", field: "finish_time" }
    ];

    return (
      <Layout>
        <div className="App">
          Vyberte podujatie
          <select name="run_id" onChange={e => this.getEvents(e.target.value)}>
            <option value="1">Furčiansky maratón</option>
            <option value="2">eXtrém maratón</option>
            <option value="3">Štafetový maratón</option>
          </select>
          Vyberte rocnik:
          <select
            name="event_id"
            onChange={e => this.getResults(e.target.value)}
          >
            <option value="">Vyberte rocnik</option>
            {this.state.events.map(event => {
              return (
                <option key={event.id} value={event.id}>
                  {event.edition}.r {event.title}
                </option>
              );
            })}
          </select>
          <DataTable
            sortBy="place"
            columns={columns}
            data={this.state.results}
          />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    baseUrl: state.baseUrl,
    events: state.resources.event
  };
};

export default connect(mapStateToProps, { fetchResourceData })(Results);
