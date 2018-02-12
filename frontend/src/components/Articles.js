import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchResourceData } from "./../actions/index";
import { Link } from "react-router-dom";
import SidebarLayout from "./Common/SidebarLayout";
import { Media } from "reactstrap";
import { truncate, removeTags } from "./../Helpers/index";

class Articles extends Component {
  static defaultProps = {
    articles: { data: [] }
  };

  componentDidMount() {
    this.props.fetchResourceData("articles");
  }

  render() {
    let articles = this.props.articles.data;

    return (
      <SidebarLayout contentTitle="Clanky">
        <div className="App">
          {articles.map(article => {
            let link = "/clanok/" + article.id;
            return (
              <Media>
                <Media left href={link}>
                  <Media
                    object
                    className="img-thumbnail"
                    src="http://via.placeholder.com/140x100"
                    alt="Generic placeholder image"
                  />
                </Media>
                <Media body>
                  <Media heading>
                    <Link to={link}>{article.title}</Link>
                  </Media>
                  <p dangerouslySetInnerHTML={{__html: truncate(removeTags(article.content), 200)}} />
                </Media>
              </Media>
            );
          })}
        </div>
      </SidebarLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    articles: state.resources.articles
  };
};

export default connect(mapStateToProps, { fetchResourceData })(Articles);
