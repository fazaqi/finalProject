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
import UserProfile from "./pages/userProfile";
// import Header from "./components/navbar";

//Style
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class App extends Component {
  state = { loading: true };

  componentDidMount() {
    let id = localStorage.getItem("kix");
    if (id) {
      Axios.get(`${APIURL}user/login/${id}`)
        .then(res => {
          if (res.data.length) {
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
          className="d-flex"
          style={{ height: "100vh" }}
          type="MutatingDots"
          color="#4ecca3"
          height={100}
          width={100}
        />
      );
    }
    return (
      <Fragment>
        {/* <Header /> */}
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/profile" exact component={UserProfile} />
        </Switch>
      </Fragment>
    );
  }
}

const MapstateToprops = state => {
  return {
    Auth: state.userLogin
  };
};

export default connect(MapstateToprops, { getDataUser })(App);
