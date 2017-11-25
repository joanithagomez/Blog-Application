import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import 'whatwg-fetch';
import queryString from 'query-string';

class Register extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formvalues: {},
            status: ""              
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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
    
    handleRegister(event) {
        const data = [];
        data.user = this.state.formvalues['user']; 
        data.fullname= this.state.formvalues['fullname'];
        data.pass = this.state.formvalues['pass'];
        const stringified = queryString.stringify(data); 
        var self = this;
        fetch('/blog/register_action.jsp', {
            method: 'POST',
            body: stringified,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            credentials: 'same-origin',
        }).then(function(response) {
            response.text().then(function (text) {
                self.setState({
                    status: text
                });
            })
        });
    }

    render() {
        const style = {
            margin: 12,
        };
        
        return (<div> <TextField
            name="fullname"
            onChange={this.handleChange} 
            hintText="Full Name"
            floatingLabelText="Full Name"
            style={{ display: 'block' }}
        />
            <TextField name="user"
        onChange={this.handleChange}        
        hintText="User Id"
        floatingLabelText="User Id"
        style={{ display: 'block' }}
        />
            <TextField name="pass"
        onChange={this.handleChange}        
        hintText="Password"
        floatingLabelText="Password"
        style={{ display: 'block' }}
            />
            <RaisedButton label="Register" onClick={this.handleRegister} style={style} primary={true} />
            
            <p>{this.state.status}</p>
        </div>);    
    }
}

export default Register;