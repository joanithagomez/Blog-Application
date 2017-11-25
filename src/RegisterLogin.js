import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';

class RegisterLogin extends Component{
    
    render() {
        return (<span>
            <Login />
            <Register/>
        </span>);
    }
}


export default RegisterLogin;
