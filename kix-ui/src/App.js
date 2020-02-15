import React, { Component } from "react";
import "./App.css";
import Login from "./pages/login";
import { Switch, Route } from "react-router-dom";
import Homepage from "./pages/home";
import Register from "./pages/register";
import Axios from "axios";
import { APIURL } from "./helper/apiUrl";
import { connect } from "react-redux";
import { userSuccess } from "./redux/actions";

class App extends Component {
  state = {};

  componentDidMount() {
    let id = localStorage.getItem("kix");
    // console.log(id);
    if (id) {
      Axios.get(`${APIURL}user/${id}`)
        .then(res => {
          // console.log(res.data[0]);
          this.props.userSuccess(res.data[0]);
        })
        .catch(err => {
          console.log(err);
        });
      // .finally(() => {
      //   this.setState({ loading: false });
      // });
    }

    // Axios.get(`${APIURL}orders?userId=`);
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
