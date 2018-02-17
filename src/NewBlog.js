import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import { NavLink } from "react-router-dom";
import { libFetch } from "./lib";
import queryString from "query-string";
import "./style.css";

class NewBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formvalues: {},
      fireRedirect: false,
      posts: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchblogs() {
    var self = this;
    fetch("/blog/blog_list.jsp", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        self.setState({
          posts: data
        });
      });
  }

  handleChange(event) {
    event.preventDefault();
    let formvalues = this.state.formvalues;
    let name = event.target.name;
    let value = event.target.value;
    formvalues[name] = value;

    this.setState({
      formvalues
    });
  }

  handleSubmit(event) {
    const data = [];

    data.title = this.state.formvalues["title"];
    data.content = this.state.formvalues["content"];
    const stringified = queryString.stringify(data);
    var self = this;
    libFetch("/blog/blog_action.jsp", "POST", stringified).then(function(response) {
      response.text().then(function(text) {
        self.fetchblogs();
      });
    });
  }

  render() {
    return (
      <div className="container">
        <TextField
          className="titlefield"
          name="title"
          onChange={this.handleChange}
          hintText="Title"
          fullWidth={true}
          multiLine={true}
          rows={1}
        />
        <TextField
          className="textarea"
          name="content"
          onChange={this.handleChange}
          // hintText="Tell us..."
          multiLine={true}
          fullWidth={true}
          rows={20}
        />
        <FlatButton containerElement={<NavLink to="/" />} label="Cancel" />
        <FlatButton
          onClick={this.handleSubmit}
          containerElement={<NavLink to="/" />}
          label="Submit"
          primary={true}
        />
      </div>
    );
  }
}

export default NewBlog;
