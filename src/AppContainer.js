import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import App from "./App";
import "./Footer.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  render() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route
            path="/"
            render={() => {
              return (
                <App
                  loggedIn={this.state.loggedIn}
                  onLogin={response => {
                    this.setState({
                      loggedIn: response
                    });
                  }}
                  onLogout={response => {
                    this.setState({
                      loggedIn: response
                    });
                  }}
                  onSession={response => {
                    this.setState({
                      loggedIn: response
                    });
                  }}
                />
              );
            }}
          />
        </Switch>
      </MuiThemeProvider>
    );
  }
}
export default withRouter(AppContainer);
