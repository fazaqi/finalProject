import React, { Component } from "react";
import "./App.css";

//Utility
// import Axios from "axios";
// import { APIURL } from "./helper/apiUrl";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "./redux/actions";

//Components
import Header from "./components/navbar";
import Login from "./pages/login";
import Homepage from "./pages/home";
import Register from "./pages/register";
import Profile from "./pages/user/userProfile";
import SellerProfile from "./pages/seller/sellerProfile";
import Loading from "./components/loading";
import NotFound from "./pages/notfound";

//Style
import Tes from "./pages/tes";
import ManageProduk from "./pages/seller/manageProduk";

class App extends Component {
  state = {};

  componentDidMount() {
    this.props.getUser();
    // let id = localStorage.getItem("kix");
    // if (id) {
    //   Axios.get(`${APIURL}user/login/${id}`)
    //     .then(res => {
    //       if (res.data.length) {
    //         // console.log(res.data[0]);
    //         this.props.getDataUser(res.data[0]);
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       this.setState({ loading: false });
    //     });
    // } else {
    //   this.setState({ loading: false });
    // }
  }

  render() {
    if (this.props.auth.loading) {
      console.log("loading dulu");
      return <Loading />;
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/profile/seller" exact component={SellerProfile} />
          <Route path="/manage-produk" exact component={ManageProduk} />
          <Route path="/test" exact component={Tes} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    auth: state.auth
  };
};

export default connect(MapstateToprops, { getUser })(App);

//Loading belum di tengah
