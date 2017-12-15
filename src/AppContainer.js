import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import App from "./App";
import "./Footer.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      lastLogin: ""
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
                  lastLogin={this.state.lastLogin}
                  onLogin={(response, lastVisited) => {
                    this.setState({
                      loggedIn: response,
                      lastLogin: lastVisited
                    });
                  }}
                  onLogout={response => {
                    this.setState({
                      loggedIn: response
                    });
                  }}
                  onSession={(response, lastVisited) => {
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
