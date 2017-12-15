import React, { Component } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p className="privacy-stmt">
          <Link to="/privacypolicy">Privacy Policy</Link>
        </p>
      </div>
    );
  }
}

export default Footer;
