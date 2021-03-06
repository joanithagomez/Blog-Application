import React, { Component } from "react";
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import "./PublicHome.css";
var createReactClass = require("create-react-class");

class PublicHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch("/blog/blog_posts.jsp", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          posts: data
        });
      });
  }

  render() {
    const postArray = [];
    //   var self = this;
    this.state.posts.forEach(function(item) {
      postArray.push(<BlogSection key={item.id} post={item} />);
    });

    return (
      <div>
        <div>{postArray}</div>
      </div>
    );
  }
}

var BlogSection = createReactClass({
  render: function() {
    return (
      <div className="blog-container">
        <div className="heading">{this.props.post.title}</div>
        <div className="body">{this.props.post.content}</div>
      </div>
    );
  }
});

export default PublicHome;
