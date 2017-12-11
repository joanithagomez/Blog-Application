import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import PublicHome from "./PublicHome";
class RegisterLogin extends Component {
  render() {
    console.log(this);
    return (
      <span>
        <Register />
        <Login onLogin={this.props.onLogin} />
        <PublicHome />
      </span>
    );
  }
}

export default RegisterLogin;
