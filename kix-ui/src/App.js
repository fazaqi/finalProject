import React, { Component } from "react";
import "./App.css";

//Tools
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getDataUser } from "./redux/actions";

//Pages
import Login from "./pages/login";
import Homepage from "./pages/home";
import Register from "./pages/register";
import UserProfile from "./pages/userProfile";

class App extends Component {
  state = {};

  componentDidMount() {
    let id = localStorage.getItem("kix");
    if (id) {
      this.props.getDataUser(id);
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/profile" exact component={UserProfile} />
      </Switch>
    );
  }
}

const MapstateToprops = state => {
  return {
    Auth: state.userLogin
  };
};

export default connect(MapstateToprops, { getDataUser })(App);
