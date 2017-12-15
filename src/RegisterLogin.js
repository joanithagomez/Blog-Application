import React, { Component } from "react";
// import Login from "./Login";
import Register from "./Register";
import PublicHome from "./PublicHome";
class RegisterLogin extends Component {
  render() {
    return (
      <span>
        <Register />
        <PublicHome />
      </span>
    );
  }
}

export default RegisterLogin;
