import React, { Component } from "react";
import Header from "./Header";
import LinkSetup from "./LinkSetup";

class Wrap extends Component {
  render() {
    return (
      <span>
        <Header loggedIn={this.props.loggedIn} onLogout={this.props.onLogout} />
        <LinkSetup
          loggedIn={this.props.loggedIn}
          onLogin={this.props.onLogin}
        />
      </span>
    );
  }
}

export default Wrap;
