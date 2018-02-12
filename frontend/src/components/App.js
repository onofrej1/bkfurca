import React, { Component } from "react";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import { Route, Switch } from "react-router-dom";
import Registration from "./Registration";
import FileBrowser from "./FileBrowser";
import "./../assets/css/main.css";
import "./../assets/css/modal-header.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Page from "./Page";
import Articles from "./Articles";
import Article from "./Article";
import HamburgResults from "./HamburgResults";
import Results from "./Results";
import Auth from "./Authorization";
import Login from "./Login";
import Register from "./Register";
import ResultsAdmin from "./ResultsAdmin";
import Home from "./Home";
import { withRouter } from "react-router-dom";
import Admin from './Admin/Admin';

class App extends Component {
  render() {
    let location = this.props.location.pathname;

    let Browser = <FileBrowser path="./public/media" />;

    if (location === "/browse") {
      return <Route path="/browse" component={() => Browser} />;
    }

    if (location === "/admin") {
      return <Route path={"/admin"} component={Admin} />;
    }

    if (location === "/test") {
      //return <Route path="/test" component={Test} />
    }

    return (
      <div>
      <Header />
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/page/:id" component={Page} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Register} />
      <Route path="/clanky" component={Articles} />
      <Route path={"/clanok/:id"} component={Article} />
      <Route path="/hamburg-vysledky" component={HamburgResults} />
      <Route path="/vysledky" component={Results} />
      <Route path={"/prihlaska"} component={Auth(['user'])(Registration)} />
      <Route path={"/results/:event_id"} component={ResultsAdmin} />
      </Switch>
      <Footer />
      </div>
    );
  }
}

export default withRouter(App);
