import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import "./Login.css";
import React, { Component } from 'react';


class Login extends Component {

    render() {
        return (
            <div className="container">
                <div className="login">
                    <TextField style={{ display: 'block' }}
                        hintText="Username"
                        floatingLabelText="Username"
                    />
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type="password"
                        style={{ display: 'block' }}
                    />
                    <RaisedButton label="Login" />
                </div>
                
            </div>
        );
    }
}
export default Login;