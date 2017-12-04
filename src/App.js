import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RegisterLogin from './RegisterLogin';
import Blog from './Blog';
import {libFetch} from './lib';
 
class App extends Component{
 
  componentDidMount() {
    var self = this;
    libFetch('/blog/session.jsp','get', null).then(function(response) {
      response.text().then((text) => {
        console.log("session when app mounting:"+ text);
        if (text.trim() !== "null") {
          self.props.onSession(true);     
        } else {
          self.props.onSession(false);  
        }
      });
    });
  }


  render() {
    if (!this.props.loggedIn) {
      return (<MuiThemeProvider>
        <RegisterLogin onLogin={this.props.onLogin} />
      </MuiThemeProvider>
      );
    }
    else {
      return (
        <MuiThemeProvider>
          <Blog onLogout={this.props.onLogout}/></MuiThemeProvider>
      );
    }
  }
  
}
  


export default App;
