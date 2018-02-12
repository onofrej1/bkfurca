import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Club from "./pages/Club";
import AboutMarathon from "./pages/AboutMarathon";
import Articles from "./Articles";
import Article from "./Article";
import Registration from "./Registration";
import Data from "./Data";
import Admin from "./Admin/Admin";
import ArticlesDrupal from './ArticlesDrupal';
import FileManager from './FileManager';
import ImageBrowser from './ImageBrowser';
import main from './../assets/css/main.css';

class Content extends Component {
  render() {

    console.log(this.props.location.pathname);

    return (
      <div>
        <Route path={"/admin"} component={Data} />
        <Route path={"/lte"} component={Admin} />
        <Route exact path="/" component={Home} />
        <Route path="/o-klube" component={Club} />
        <Route path="/maraton" component={AboutMarathon} />
        <Route path="/clanky" component={Articles} />
        <Route path="/files" component={FileManager} />
        <Route path={"/clanok/:id"} component={Article} />
        <Route path={"/prihlaska"} component={Registration} />
        <Route path="/articles" component={ArticlesDrupal} />

      </div>
    );
  }
}
export default Content;
