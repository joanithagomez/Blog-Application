import React, { Component } from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import { libFetch } from "./lib";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };
  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <span>
        <AppBar
          title="Blog"
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            this.props.loggedIn ? (
              <Logged onLogout={this.props.onLogout} />
            ) : (
              false
            )
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <AppBar showMenuIconButton={false} />
          <MenuItem
            primaryText="Home"
            containerElement={<NavLink to="/" />}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText=" XSS Demo"
            containerElement={<NavLink to="/xssdemo" />}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="Website Defacing"
            containerElement={<NavLink to="/websitedefacing" />}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="Cookie Demo"
            containerElement={<NavLink to="/cookiedemo" />}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="Encryption/Decryption"
            containerElement={<NavLink to="/enc-decr" />}
            onClick={this.handleClose}
          />
        </Drawer>
      </span>
    );
  }
}

class Logged extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    let self = this;
    libFetch("/blog/logout.jsp", "GET", null).then(response => {
      response.text().then(text => {
        console.log("logged out");
        self.props.onLogout(false);
      });
    });
  }
  render() {
    return (
      <FlatButton
        style={{ color: "white" }}
        onClick={this.handleLogout}
        label="Logout"
      />
    );
  }
}

export default Header;
