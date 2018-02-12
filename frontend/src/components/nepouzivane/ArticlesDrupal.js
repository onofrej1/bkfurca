import React, { Component } from "react";
import { connect } from "react-redux";
import { setArticles } from "./../actions/index";
import axios from "axios";
import { Link } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";

/*axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "data";*/

class ArticlesDrupal extends Component {
  static defaultProps = {
    //articles: []
  };

  constructor(props) {
    super(props);
    this.state = { articles: [] };
  }

  componentDidMount() {
    const url = "http://localhost/web/drupal-furca/api/articles";
    axios.get(url).then(result => {
      this.setState({ articles: result.data });
      console.log(result.data[0]);
    });

    var newNode = {
      _links: {
        type: {
          href: "http://localhost/web/drupal-furca/rest/type/node/article"
        }
      },
      type: {
        target_id: "page"
      },
      title: {
        value: "Example node title"
      }
    };

    axios
      .get("http://localhost/web/drupal-furca/rest/session/token")
      .then(res => {
        //this.setState({articles: result.data});
        console.log(res.data);
        /*
        axios({
          method: "POST",
          url: "http://localhost/web/drupal-furca/node?_format=hal_json",
          headers: {
            "Content-Type": "application/hal+json",
            "Authorization": "Basic "+btoa('admin:admin'),
            //"x-csrf-token": res.data
            //"X-CSRF-Token": res.data
          },
          data: JSON.stringify(newNode)
        })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log("server error", error);
          });
          */
        /*axios
          .post("http://localhost/web/drupal-furca/node", {
            title: [{ value: "Hello World" }],
            body: [{ value: "How are you?" }]
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log("server error", error);
          });*/
      });
  }

  render() {
    return (
      <SidebarLayout>
        <div className="App">
          Articles
          {this.state.articles.map(article => {
            return (
              <div>
                <Link to={"/clanok/1"}>aa {article.title}</Link>
                <div dangerouslySetInnerHTML={{ __html: article.body }} />
              </div>
            );
          })}
        </div>
      </SidebarLayout>
    );
  }
}

export default ArticlesDrupal;
/*const mapStateToProps = (state, ownProps) => {
  return {
    articles: state.articles
  };
};*/

//export default connect(mapStateToProps, { setArticles })(ArticlesDrupal);
