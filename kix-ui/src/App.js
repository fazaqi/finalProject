import React, { Component, Fragment } from "react";
import "./App.css";

//Utility
import Axios from "axios";
import { APIURL } from "./helper/apiUrl";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getDataUser } from "./redux/actions";

//Components
import Login from "./pages/login";
import Homepage from "./pages/home";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Sidebar from "./components/sidebar";
//Style
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Tes from "./pages/tes";

class App extends Component {
  state = { loading: true };

  componentDidMount() {
    let id = localStorage.getItem("kix");
    if (id) {
      Axios.get(`${APIURL}user/login/${id}`)
        .then(res => {
          if (res.data.length) {
            // console.log(res.data[0]);
            this.props.getDataUser(res.data[0]);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Loader
          className="loadspinner"
          type="MutatingDots"
          color="#4ecca3"
          height={100}
          width={100}
        />
      );
    }
    return (
      <Fragment>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/test" exact component={Tes} />
          <Route path="/sidebar" exact component={Sidebar} />
        </Switch>
      </Fragment>
    );
  }
}

const MapstateToprops = state => {
  return {
    auth: state.auth
  };
};

export default connect(MapstateToprops, { getDataUser })(App);

//Loading belum di tengah
