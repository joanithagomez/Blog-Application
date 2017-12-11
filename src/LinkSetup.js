import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import EncryptionDecryption from "./EncryptionDecryption";
import Xss from "./Xss";
import SiteDefacing from "./SiteDefacing";
import CookieDemo from "./CookieDemo";
import RegisterLogin from "./RegisterLogin";
import Blog from "./Blog";
import NewBlog from "./NewBlog";

class LinkSetup extends Component {
  render() {
    const MyRegisterLogin = props => {
      return <RegisterLogin onLogin={this.props.onLogin} />;
    };

    const MyBlog = props => {
      return <Blog onLogout={this.props.onLogout} />;
    };

    return (
      <div className="content">
        <Switch>
          {this.props.loggedIn ? (
            <span>
              <Route exact path="/" render={MyBlog} />
              <Route path="/newblog" component={NewBlog} />
            </span>
          ) : (
            <Route exact path="/" render={MyRegisterLogin} />
          )}
          <Route path="/xssdemo" component={Xss} />
          <Route path="/websitedefacing" component={SiteDefacing} />
          <Route path="/enc-decr" component={EncryptionDecryption} />
          <Route path="/cookiedemo" component={CookieDemo} />
        </Switch>
      </div>
    );
  }
}

/* <Blog onLogout={this.props.onLogout} /> */

export default LinkSetup;
