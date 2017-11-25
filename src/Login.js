import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Register from './Register';
import "./Login.css";

class Login extends Component{

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
                <div className="register">
                    <Register />
                </div>
            </div>
        );
    }
export default Login;