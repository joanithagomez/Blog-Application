import React, { Component } from "react";
// import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
// import "./SiteDefacing.css";
import "./style.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import RaisedButton from "material-ui/RaisedButton";

class SiteDefacing extends Component {
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
      <div className="container">
        <div>
          <h1>Website Defacing Demo</h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: this.createMarkup() }} />
        <div>
          <img alt="GoWarriors" />
        </div>

        <div>
          <TextField
            onChange={this.handleChange}
            fullWidth={true}
            floatingLabelText="Title"
          />
        </div>
        <div className="instructions">
          <h3>To test:</h3>

          <div>
            {
              "<img src=0 onerror=\"document.getElementsByTagName('img')[1].src = 'https://dontweightaround.files.wordpress.com/2011/10/gowarriors.jpg'\">"
            }
            <CopyToClipboard
              onCopy={this.onCopy}
              text={
                "<img src=0 onerror=\"document.getElementsByTagName('img')[1].src = 'https://dontweightaround.files.wordpress.com/2011/10/gowarriors.jpg'\">"
              }
            >
              <RaisedButton label="Copy to clipboard" />
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }
}

export default SiteDefacing;
