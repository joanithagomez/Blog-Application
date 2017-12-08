import React, { Component } from 'react';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import './PublicHome.css';
import AppBar from 'material-ui/AppBar';
var createReactClass = require('create-react-class');

var BlogSection = createReactClass({
    render: function () {
        return (
            <div className="blog-container">
                <div className="heading">{this.props.post.title}</div>
                <div className="body">{this.props.post.content}</div>
            </div>
          );
      }
});

class PublicHome extends Component{
    constructor(props) {
        super(props);
        this.state = {
         //   formvalues: {},
            posts: [],
           };
    }


    componentDidMount() {
        fetch('/blog/blog_posts.jsp', {
            method: 'GET',
            credentials: "include",
          }).then((response) => response.json()).then((data)=> {
              this.setState({
                posts: data,
              });
            });
    }
    
    render() {
    
          const postArray = [];
        //   var self = this;
          this.state.posts.forEach(function (item) {
            postArray.push(<BlogSection key={item.id} post={item}/>);
          });
        
        return (
            
            <div>
                <AppBar title="Blog" />
                <div>
                    {postArray}
                </div>

            </div>
        );
    }
    
}
export default PublicHome;