import React, { Component } from "react";
import "./App.css";

// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import RegisterLogin from "./RegisterLogin";
// import Blog from "./Blog";
import { libFetch } from "./lib";
// import Header from "./Header";
import Wrap from "./Wrap";

class App extends Component {
  componentDidMount() {
    var self = this;
    libFetch("/blog/session.jsp", "get", null).then(function(response) {
      response.text().then(text => {
        // console.log("session when app mounting:" + text);
        if (text.trim() !== "null") {
          self.props.onSession(true);
        } else {
          self.props.onSession(false);
        }
      });
    });
  }

  render() {
    // var returnValue = [];
    // returnValue.push(
    //   <Header logged={this.props.loggedIn} onLogout={this.props.onLogout} />
    // );
    // returnValue.push(<LinkSetup />);
    //
    // if (!this.props.loggedIn) {
    //   returnValue.push(<RegisterLogin onLogin={this.props.onLogin} />);
    // } else {
    // returnValue.push(
    return (
      <div className="app-container">
        <Wrap
          loggedIn={this.props.loggedIn}
          onLogin={this.props.onLogin}
          onLogout={this.props.onLogout}
        />
      </div>
    );
    // }
    // return returnValue;
  }
}

export default App;
