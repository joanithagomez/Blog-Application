import React, { Component } from "react";
// import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
// import AppBar from "material-ui/AppBar";
// import TableContainer from './TableContainer';
import "./Blog.css";
import { libFetch } from "./lib";
import queryString from "query-string";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
var createReactClass = require("create-react-class");

var BlogGridRow = createReactClass({
  isSelected: function(index) {
    return this.props.selectedItem.indexOf(index) !== -1;
  },

  render: function() {
    return (
      <TableRow selected={this.isSelected(this.props.post.id)}>
        <TableRowColumn>{this.props.post.title}</TableRowColumn>
        <TableRowColumn>{this.props.post.status}</TableRowColumn>
      </TableRow>
    );
  }
});

class Blog extends Component {
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

  handleRowSelection = selectedRows => {
    this.setState({
      selected: selectedRows
    });
  };

  componentDidMount() {
    this.fetchblogs();
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
    var rows = [];
    var self = this;
    this.state.posts.forEach(function(item) {
      if (self.state.selected !== undefined)
        rows.push(
          <BlogGridRow
            key={item.id}
            selectedItem={self.state.selected}
            post={item}
          />
        );
    });

    const style = {
      margin: 12
    };
    return (
      <div>
        <RaisedButton
          onClick={this.handleAdd}
          label="New Blog"
          primary={true}
          style={style}
        />

        <Table onRowSelection={this.handleRowSelection}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>{rows}</TableBody>
        </Table>

        {/* post form */}
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
          label="Submit"
          secondary={true}
          style={style}
        />
      </div>
    );
  }
}

export default Blog;
