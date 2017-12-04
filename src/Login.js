import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import "./Login.css";
import React, { Component } from 'react';
import queryString from 'query-string';
import {libFetch} from './lib';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formvalues: {},
            status: ""              
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


  handleChange(event) {
    event.preventDefault();
    let formvalues = this.state.formvalues;
    let name = event.target.name;
    let value = event.target.value;
    formvalues[name] = value;
  
    this.setState({
        formvalues,
    });
  }
    
    handleLogin(event) {
        const data = [];
        data.user = this.state.formvalues['user']; 
        data.pass = this.state.formvalues['pass'];
        const stringified = queryString.stringify(data); 
        var self = this;
     
        libFetch('/blog/login_action.jsp', 'POST', stringified).then(function (response) {
            response.text().then(function (text) {
                console.log("Login reposnse :" + text.trim());
                console.log("Username :" + data.user);
                
                if (text.trim() === data.user) {
                    self.props.onLogin(true);
                    self.setState({
                        status: "Login Successful"
                    });
                } else {
                    self.setState({
                        status: "Incorrect Username or password."
                    });
                }
               
            })
        });
    }


    
    render() {
        const style = {
            margin: 12,
        };
        
        return (
            <div className="container">
                <div className="login">
                    <TextField name="user" style={{ display: 'block' }}
                    onChange={this.handleChange}     
                        hintText="Username"
                        floatingLabelText="Username"
                    />
                    <TextField name="pass"
                    onChange={this.handleChange}    
                        hintText="Password"
                        floatingLabelText="Password"
                        type="password"
                        style={{ display: 'block' }}
                    />
                   <RaisedButton label="Login" onClick={this.handleLogin} style={style} />
            
                    <p>{this.state.status}</p>
                     
                </div>
                
            </div>
        );
    }
}
export default Login;