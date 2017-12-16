import React, { Component } from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import { libFetch } from "./lib";
// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "./Login";
import "./style.css";
import Popover from "material-ui/Popover";
import RaisedButton from "material-ui/RaisedButton";

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
          className="appbar"
          onLeftIconButtonClick={this.handleToggle}
          iconElementRight={
            this.props.loggedIn ? (
              <Logged onLogout={this.props.onLogout} />
            ) : (
              <LogInButton onLogin={this.props.onLogin} />
            )
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <AppBar className="appbar" showMenuIconButton={false} />
          <MenuItem
            primaryText="Home"
            containerElement={<Link to="/" />}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText=" XSS Demo"
            containerElement={<Link to="/xssdemo" />}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="Website Defacing"
            containerElement={<Link to="/websitedefacing" />}
            onClick={this.handleClose}
          />
          <MenuItem
            primaryText="Encryption/ Decryption"
            containerElement={<Link to="/encdec" />}
            onClick={this.handleClose}
          />
        </Drawer>
      </span>
    );
  }
}

class LogInButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleClick = event => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };
  render() {
    return (
      <div>
        <RaisedButton onClick={this.handleClick} primary={true} label="Login" />
        <Popover
          style={{ width: 400, backgroundColor: "#fff" }}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: "middle", vertical: "center" }}
          targetOrigin={{ horizontal: "right", vertical: "top" }}
          onRequestClose={this.handleRequestClose}
        >
          <Login onLogin={this.props.onLogin} />
        </Popover>
      </div>
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
        containerElement={<Link to="/" />}
        label="Logout"
      />
    );
  }
}

export default Header;
