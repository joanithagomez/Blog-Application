import React, { Component } from "react";
import Header from "./Header";
import LinkSetup from "./LinkSetup";
import Footer from "./Footer";

class Wrap extends Component {
  render() {
    return (
      <span>
        <Header
          loggedIn={this.props.loggedIn}
          onLogin={this.props.onLogin}
          onLogout={this.props.onLogout}
        />
        <LinkSetup loggedIn={this.props.loggedIn} lastLogin={this.props.lastLogin} />
        <Footer />
      </span>
    );
  }
}

export default Wrap;
