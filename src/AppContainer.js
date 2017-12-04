import React, {Component} from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import App from './App';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        };
    }

    render() {
        return (
            <Switch>
                <Route path="/" render={() => {
                    return <App
                        loggedIn={this.state.loggedIn} onLogin={
                            (response) => {
                            this.setState({
                                loggedIn: response,
                            });
                        }} 
                        onLogout={(response) => {
                            this.setState({
                                loggedIn:response,
                            });
                        }}
                        onSession={(response) => {
                            this.setState({
                                loggedIn: response
                            });
                        }} />
                }} />
            </Switch>

        );
    }
}
export default withRouter(AppContainer);