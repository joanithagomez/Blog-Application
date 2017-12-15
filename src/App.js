import React, { Component } from "react";
import "./App.css";
import { libFetch } from "./lib";
import Wrap from "./Wrap";

class App extends Component {
  componentDidMount() {
    var self = this;
    libFetch("/blog/session.jsp", "get", null).then(function(response) {
      response.text().then(text => {
        if (text.trim() !== "null") {
          self.props.onSession(true);
        } else {
          self.props.onSession(false);
        }
      });
    });
  }

  render() {
    return (
      <div className="app-container">
        <Wrap
          loggedIn={this.props.loggedIn}
          onLogin={this.props.onLogin}
          onLogout={this.props.onLogout}
          lastLogin={this.props.lastLogin}
        />
      </div>
    );
  }
}

export default App;
