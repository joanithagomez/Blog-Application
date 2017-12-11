import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { NavLink } from "react-router-dom";
import { libFetch } from "./lib";
import queryString from "query-string";

class NewBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formvalues: {},
      posts: [],
      selected: [0]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  fetchblogs() {
    fetch("/blog/blog_list.jsp", {
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
    // var array = [];
    libFetch("/blog/blog_action.jsp", "POST", stringified).then(function(
      response
    ) {
      response.text().then(function(text) {
        self.fetchblogs();
      });
    });
  }

  render() {
    const style = {
      margin: 12
    };
    return (
      <div>
        {" "}
        <TextField
          name="title"
          onChange={this.handleChange}
          hintText="Title"
          multiLine={true}
          rows={1}
        />
        <TextField
          name="content"
          onChange={this.handleChange}
          hintText="MultiLine with rows: 2 and rowsMax: 4"
          multiLine={true}
          fullWidth={true}
        />
        <RaisedButton
          onClick={this.handleSubmit}
          containerElement={<NavLink to="/" />}
          label="Submit"
          secondary={true}
          style={style}
        />
      </div>
    );
  }
}

export default NewBlog;
