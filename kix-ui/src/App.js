import React, { Component } from "react";
import "./App.css";

//Utility
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
import Tes from "./pages/tes";
import ManageProduk from "./pages/seller/manageProduk";
import DetailProduk from "./pages/detailProduk";
import DetailToko from "./pages/seller/detailToko";
import Cart from "./pages/cart";
import Shop from "./pages/shop";
import Pembelian from "./pages/user/pembelian";
import Pembayaran from "./pages/admin/pembayaran";
import Penjualan from "./pages/seller/penjualan";

class App extends Component {
  state = {};

  componentDidMount() {
    this.props.getUser();
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
          <Route path="/profile-user" exact component={Profile} />
          <Route path="/profile-seller" exact component={SellerProfile} />
          <Route path="/manage-produk" exact component={ManageProduk} />
          <Route path="/detail-produk/:id" exact component={DetailProduk} />
          <Route path="/detail-toko/:id" exact component={DetailToko} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/order" exact component={Pembelian} />
          <Route path="/payment" exact component={Pembayaran} />
          <Route path="/penjualan" exact component={Penjualan} />
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
