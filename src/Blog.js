import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import "./Blog.css";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { libFetch } from "./lib";
import queryString from "query-string";


class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      selectedItem: [0],
      selectedBlog: {}
    };
  }

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

  
  handleDelete(id, e) {
    const data = [];
    data.id = id;
    const stringified = queryString.stringify(data);
    var self = this;
    libFetch("/blog/delete_blog.jsp", "POST", stringified)
      .then(response => response.text())
      .then(text => {
        self.fetchblogs();
      });
  }

  isSelected(index) {
    return this.state.selectedItem.indexOf(index) !== -1;
  }

  handleRowSelection = selectedRow => {
    this.setState({
      selectedItem: selectedRow
    });
  };

handleView(id, e) {
    const data = [];
    data.id = id;
    const stringified = queryString.stringify(data);
    libFetch("/blog/view_blog.jsp", "POST", stringified)
      .then(response => response.json())
      .then(data => {
        this.setState({
          selectedBlog: data
        });
      });
   
  }

  renderBlogList(posts) {
    var rows = [];
    var self = this;
    posts.forEach(function(item) {
      if (self.state.selectedItem !== undefined)
        rows.push(
          <TableRow key={item.id}>
            <TableRowColumn>{item.title}</TableRowColumn>
            <TableRowColumn>
              <FlatButton label="View" onClick={self.handleView.bind(self, item.id)} />
              <FlatButton
                label="Delete"
                onClick={self.handleDelete.bind(self, item.id)}
              />
            </TableRowColumn>
          </TableRow>
        );
    });
    return rows;
  }


  render() {
    const style = {
      margin: 12
    };
    return (
      <span>
        <div className="blog-container">
          <RaisedButton
            containerElement={<Link to="/newblog" />}
            label="New Blog"
            secondary={true}
            style={style}
          />
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Title</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.renderBlogList(this.state.posts)}
            </TableBody>
          </Table>

          <div className="blog-container">
            <div className="heading">{this.state.selectedBlog.title}</div>
            <div className="body">{this.state.selectedBlog.content}</div>
          </div>
        </div>
        <p className="lastlogin">Last login: {this.props.lastLogin}</p>
      </span>
    );
  }
}


export default Blog;
