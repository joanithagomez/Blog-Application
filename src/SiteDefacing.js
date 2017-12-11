import React, { Component } from "react";
// import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import "./SiteDefacing.css";

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
      <span>
        <h1>Website Defacing Demo</h1>
        <div dangerouslySetInnerHTML={{ __html: this.createMarkup() }} />
        <img
          style={{ display: "block" }}
          alt="GoWarriors"
          src="https://www.downtowncampbell.com/sites/default/files/styles/8-large_650/public/uploads/users/2915/images_5_0?itok=fVADfn-Q"
        />
        <TextField
          onChange={this.handleChange}
          fullWidth={true}
          floatingLabelText="Title"
        />
        {/* <TextField
          onChange={this.handleChange}
          hintText="Body"
          fullWidth={true}
          rows={2}
        /> */}
        <div className="instructions">
          {
            "<img src=0 onerror=\"document.getElementsByTagName('img')[1].src = 'https://dontweightaround.files.wordpress.com/2011/10/gowarriors.jpg'\">"
          }
        </div>
      </span>
    );
  }
}

export default SiteDefacing;
