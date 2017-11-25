import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class Register extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formvalues: {},
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
        const data = new FormData();
        data.append('user', this.state.formvalues['user']);        
        data.append('fullname', this.state.formvalues['fullname']);
        data.append('pass', this.state.formvalues['pass']);
        axios.post('/blog/register_action.jsp', data).then((response) => {
              console.log(response.data);
            });
    }

    render() {
        const style = {
            margin: 12,
        };
        
        return(<div> <TextField
            hintText="Full Name"
            floatingLabelText="Full Name"
            style={{ display: 'block' }}
        />
            <TextField
        onChange={this.handleChange}        
        hintText="User Id"
        floatingLabelText="User Id"
        style={{ display: 'block' }}
        />
            <TextField
        onChange={this.handleChange}        
        hintText="Password"
        floatingLabelText="Password"
        style={{ display: 'block' }}
            />
            <RaisedButton label="Register" onClick={this.handleRegister}style={style} primary={true}/>
        </div>);    
    }
}

export default Register;