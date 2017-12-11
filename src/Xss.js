import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

class Xss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_supplied: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      user_supplied: event.target.value
    });
  }
  createMarkup() {
    return this.state.user_supplied;
  }

  render() {
    return (
      <span>
        <h1>Cross-site scripting Demo</h1>
        <div dangerouslySetInnerHTML={{ __html: this.createMarkup() }} />
        {/* Escaped: <div>{this.createMarkup()} </div> */}
        <TextField onChange={this.handleChange} floatingLabelText="Title" />
        {/* <TextField
          onChange={this.handleChange}
          hintText="Body"
          fullWidth={true}
          rows={2}
        /> */}
        <div style={{ display: "inline" }}>
          {"<img src=0 onerror='alert(1)'/>"}
        </div>
        <RaisedButton label="Copy" />
        <div style={{ display: "inline" }}>{"<h1>Demo text<h1/>"}</div>
        <RaisedButton label="Copy" />
      </span>
    );
  }
}

export default Xss;
