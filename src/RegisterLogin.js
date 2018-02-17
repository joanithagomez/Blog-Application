import React, { Component } from "react";
import "./style.css";

import Register from "./Register";
import PublicHome from "./PublicHome";
class RegisterLogin extends Component {
  render() {
    return (
      <div className="wrap">
        <span className="register">
          <Register />
        </span>
        <div>
          <PublicHome />
        </div>
      </div>
    );
  }
}

export default RegisterLogin;
