import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import "./style.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

var CryptoJS = require("crypto-js");

class EncDec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      result: null
    };
  }

  handleEncClick = event => {
    event.preventDefault();
    // console.log(this.state.fields["msg"] + " " + this.state.fields["key"]);
    if (
      this.state.fields["msg"] === undefined ||
      this.state.fields["key"] === undefined
    ) {
      this.setState({
        result: "Fields empty. Please provide message and key"
      });
    } else {
      var en = CryptoJS.AES.encrypt("msg", "key");
      console.log(en.toString());
      var encrypted = CryptoJS.AES.encrypt(
        this.state.fields["msg"],
        this.state.fields["key"]
      );

      this.setState({
        result: encrypted.toString()
      });
      // console.log("SHA256" + SHA256("Message"));
    }
  };

  handleDecClick = event => {
    event.preventDefault();
    console.log(this.state.fields["cipher"] + " " + this.state.fields["deckey"]);
    if (
      this.state.fields["cipher"] === undefined ||
      this.state.fields["deckey"] === undefined
    ) {
      this.setState({
        result: "Fields empty. Please provide message and key"
      });
    } else {
      var bytes = CryptoJS.AES.decrypt(
        this.state.fields["cipher"],
        this.state.fields["deckey"]
      );
      var de = bytes.toString(CryptoJS.enc.Utf8);

      console.log(de.toString());

      this.setState({
        result: de
      });
      // console.log("SHA256" + SHA256("Message"));
    }
  };

  handleChange = event => {
    event.preventDefault();
    let fields = this.state.fields;
    let name = event.target.name;
    let value = event.target.value;
    fields[name] = value;

    this.setState({
      fields
    });
  };
  render() {
    return (
      <div className="container">
        <h1>AES Encryption/ Decryption</h1>
        <div className="enc">
          <TextField
            name="msg"
            onChange={this.handleChange}
            fullWidth={true}
            floatingLabelText="Message"
          />
          <TextField
            name="key"
            onChange={this.handleChange}
            fullWidth={true}
            floatingLabelText="Key"
          />
          <RaisedButton onClick={this.handleEncClick} label="Encrypt" />
        </div>
        <p style={{ float: "left" }}> Result:</p>
        <span className="result">
          <p>{this.state.result}</p>
        </span>
        <CopyToClipboard onCopy={this.onCopy} text={this.state.result}>
          <RaisedButton label="Copy to clipboard" />
        </CopyToClipboard>
        <div className="dec">
          <TextField
            name="cipher"
            onChange={this.handleChange}
            fullWidth={true}
            floatingLabelText="Cipher text"
          />
          <TextField
            name="deckey"
            onChange={this.handleChange}
            fullWidth={true}
            floatingLabelText="Key"
          />
          <RaisedButton onClick={this.handleDecClick} label="Decrypt" />
        </div>
      </div>
    );
  }
}

export default EncDec;
