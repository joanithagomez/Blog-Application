import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./style.css";

class Xss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_supplied: "",
      copied: false
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

  onCopy = () => {
    this.setState({ copied: true });
  };
  render() {
    return (
      <div className="container">
        <h1>Cross-site scripting Demo</h1>
        <div dangerouslySetInnerHTML={{ __html: this.createMarkup() }} />
        <TextField onChange={this.handleChange} floatingLabelText="Title" />
        <div>
          {"<img src=0 onerror='alert(1)'/>"}
          <CopyToClipboard onCopy={this.onCopy} text={"<img src=0 onerror='alert(1)'/>"}>
            <RaisedButton label="Copy" />
          </CopyToClipboard>
        </div>
        <div>
          {"<h1>Demo text<h1/>"}
          <CopyToClipboard onCopy={this.onCopy} text={"<h1>Demo text<h1/>"}>
            <RaisedButton label="Copy" />
          </CopyToClipboard>
        </div>
        <div>
          {"<img src=0 onerror='console.log(document.cookie);'"}/>
          <CopyToClipboard
            onCopy={this.onCopy}
            text={"<img src=0 onerror='console.log(document.cookie);'"}
          >
            <RaisedButton label="Copy" />
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

export default Xss;
