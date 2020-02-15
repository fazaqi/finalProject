import React, { Component } from "react";
import "./App.css";

//Tools
import Axios from "axios";
import { Switch, Route } from "react-router-dom";
import { APIURL } from "./helper/apiUrl";
import { connect } from "react-redux";
import { userSuccess } from "./redux/actions";

//Pages
import Login from "./pages/login";
import Homepage from "./pages/home";
import Register from "./pages/register";

class App extends Component {
  state = {};

  componentDidMount() {
    let id = localStorage.getItem("kix");
    if (id) {
      Axios.get(`${APIURL}user/login/${id}`)
        .then(res => {
          this.props.userSuccess(res.data[0]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    );
  }
}

const MapstateToprops = state => {
  return {
    Auth: state.userLogin
  };
};

export default connect(MapstateToprops, { userSuccess })(App);
