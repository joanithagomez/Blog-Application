import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import "whatwg-fetch";
import queryString from "query-string";
import ReCAPTCHA from "./recaptcha-wrapper";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formvalues: {},
      status: "",
      recaptchaResponse: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.onCaptchaChange = this.onCaptchaChange.bind(this);
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

  handleRegister(event) {
    var self = this;

    if (
      this.state.formvalues["user"] === "" ||
      this.state.formvalues["user"] === undefined ||
      (this.state.formvalues["fullname"] === "" ||
        this.state.formvalues["user"] === undefined) ||
      (this.state.formvalues["pass"] === "" ||
        this.state.formvalues["user"] === undefined)
    ) {
      self.setState({
        status: "Required fields left empty."
      });
    } else {
      const data = [];
      data.user = this.state.formvalues["user"];
      data.fullname = this.state.formvalues["fullname"];
      data.pass = this.state.formvalues["pass"];
      data.recaptchaResponse = this.state.recaptchaResponse;
      const stringified = queryString.stringify(data);
      fetch("/blog/register_action.jsp", {
        method: "POST",
        body: stringified,
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        credentials: "same-origin"
      }).then(function(response) {
        response.text().then(function(text) {
          self.setState({
            status: text
          });
        });
      });
    }
  }
  onCaptchaChange(response) {
    // console.log(response);
    this.setState({
      recaptchaResponse: response
    });
  }

  render() {
    const style = {
      margin: 12
    };

    return (
      <div>
        <TextField
          name="fullname"
          onChange={this.handleChange}
          hintText="Full Name"
          floatingLabelText="Full Name"
          style={{ display: "block" }}
        />
        <TextField
          name="user"
          onChange={this.handleChange}
          hintText="User Id"
          floatingLabelText="User Id"
          style={{ display: "block" }}
        />
        <TextField
          name="pass"
          onChange={this.handleChange}
          hintText="Password"
          type="password"
          floatingLabelText="Password"
          style={{ display: "block" }}
        />
        <RaisedButton
          label="Register"
          onClick={this.handleRegister}
          style={style}
          secondary={true}
        />
        <ReCAPTCHA
          ref="recaptcha"
          sitekey="6LfuHz0UAAAAAIBDUjKsEWW5Dvem4L08077vI6aC"
          onChange={this.onCaptchaChange}
        />
        <p>{this.state.status}</p>
      </div>
    );
  }
}

export default Register;
