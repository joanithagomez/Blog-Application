import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Xss from "./Xss";
import SiteDefacing from "./SiteDefacing";
import RegisterLogin from "./RegisterLogin";
import Blog from "./Blog";
import NewBlog from "./NewBlog";
import PrivacyPolicy from "./PrivacyPolicy";
import EncryptionDecryption from "./EncryptionDecryption";
class LinkSetup extends Component {
  render() {
    const MyRegisterLogin = props => {
      return <RegisterLogin onLogin={this.props.onLogin} />;
    };

    const MyBlog = props => {
      return <Blog lastLogin={this.props.lastLogin} />;
    };

    return (
      <div className="content">
        <Switch>
          {this.props.loggedIn ? (
            // <span>
            <Route exact path="/" render={MyBlog} />
          ) : (
            // </span>
            <Route exact path="/" render={MyRegisterLogin} />
          )}
          {this.props.loggedIn ? (
            <Route path="/newblog" component={NewBlog} />
          ) : (
            <Route exact path="/" render={MyRegisterLogin} />
          )}

          <Route path="/xssdemo" component={Xss} />
          <Route path="/websitedefacing" component={SiteDefacing} />
          <Route path="/privacypolicy" component={PrivacyPolicy} />
          <Route path="/encdec" component={EncryptionDecryption} />
        </Switch>
      </div>
    );
  }
}

/* <Blog onLogout={this.props.onLogout} /> */

export default LinkSetup;
