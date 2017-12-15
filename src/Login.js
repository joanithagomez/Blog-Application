import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
// import FlatButton from "material-ui/FlatButton";
import "./Login.css";
import React, { Component } from "react";
import queryString from "query-string";
import { libFetch } from "./lib";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formvalues: {},
      status: "",
      lastLogin: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
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

  handleDemoLogin(event) {
    const data = [];
    data.user = this.state.formvalues["user"];
    data.pass = this.state.formvalues["pass"];
    const stringified = queryString.stringify(data);
    var self = this;

    libFetch("/blog/demologin_action.jsp", "POST", stringified).then(function(response) {
      response.text().then(function(text) {
        if (text.trim() === "1") {
          self.props.onLogin(true, self.state.lastLogin);
          self.setState({
            status: "Login Successful"
          });
        } else {
          self.setState({
            status: "Incorrect Username or password."
          });
        }
      });
    });
  }

  setCookie(username) {
    var entry = {};
    entry[username] = new Date().toString();

    // console.log("Now: " + JSON.stringify(x));

    //

    if (document.cookie === "") {
      console.log("Last login: now");
      document.cookie = "lastVisited=" + JSON.stringify(entry);
      console.log(document.cookie);
    } else {
      var cukie = document.cookie;
      // console.log("cukie read: " + cukie);
      var obj = cukie.substring(12);
      var objectcookie = JSON.parse(obj);
      var lastVisited;
      if (objectcookie.hasOwnProperty(username)) {
        lastVisited = objectcookie[username];
      } else {
        lastVisited = new Date().toString();
      }
      console.log("Last login: " + lastVisited);

      this.setState({
        lastLogin: lastVisited
      });
      objectcookie[username] = new Date().toString();
      document.cookie = "lastVisited=" + JSON.stringify(objectcookie);

      // }
    }
  }

  //
  //
  handleLogin(event) {
    const data = [];
    data.user = this.state.formvalues["user"];
    data.pass = this.state.formvalues["pass"];
    const stringified = queryString.stringify(data);
    var self = this;
    libFetch("/blog/login_action.jsp", "POST", stringified).then(function(response) {
      response.text().then(function(text) {
        console.log("Username :" + data.user);

        if (text.trim() === "1") {
          self.setCookie(data.user);
          self.props.onLogin(true, self.state.lastLogin);
          // self.props.setLastLogin(this.state.lastLogin);
        } else {
          self.setState({
            status: "Incorrect Username or password."
          });
        }
      });
    });
  }

  render() {
    const style = {
      margin: 5
    };
    const textfieldStyle = {
      width: 180,
      color: "white"
    };
    return (
      <div className="login-container">
        <div className="login">
          <div>
            <TextField
              name="user"
              onChange={this.handleChange}
              hintText="Username"
              floatingLabelText="Username"
              style={textfieldStyle}
            />
          </div>
          <div>
            <TextField
              name="pass"
              onChange={this.handleChange}
              hintText="Password"
              floatingLabelText="Password"
              type="text"
              style={textfieldStyle}
            />
          </div>
          <div>
            <RaisedButton label="Login" onClick={this.handleLogin} style={style} />
          </div>
          <div>
            <RaisedButton label="SQL" onClick={this.handleDemoLogin} style={style} />
          </div>
          <p>{this.state.status}</p>
        </div>
      </div>
    );
  }
}
export default Login;
