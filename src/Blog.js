import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import './Blog.css';
import {libFetch} from './lib';

class Blog extends Component{
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    let self = this;
    libFetch('/blog/logout.jsp','GET',null).then((response) => {
      response.text().then((text) => {
        console.log("logged out");
          self.props.onLogout(false);
      });
    });
  }

  render() {
    const style = {
      margin: 12,
    };
        return (
            <div>
            <AppBar
                title="Blog"
              iconElementRight={<FlatButton onClick={this.handleLogout} label="Logout" />}
            />
          <RaisedButton label="New Blog" primary={true} style={style} />
            
            </div>
        );
    }
}

export default Blog;