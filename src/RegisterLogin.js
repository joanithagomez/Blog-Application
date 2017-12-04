import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';

class RegisterLogin extends Component{
    
    render() {
        return (<span>
            <Register />
            <Login onLogin={this.props.onLogin}/>
    
        </span>);
    }
}


export default RegisterLogin;
