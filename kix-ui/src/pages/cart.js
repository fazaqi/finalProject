import React, { Component } from "react";

import {
  Card,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";

import Footer from "../components/footer";
import { connect } from "react-redux";
import Axios from "axios";
import { APIURL } from "../helper/apiUrl";
import Numeral from "numeral";
import { AiTwotoneShop } from "react-icons/ai";
import { Link, Redirect } from "react-router-dom";
import { getCart } from "../redux/actions";
import { ToastContainer, toast, Slide } from "react-toastify";
import Loading from "../components/loading";
import cart from "../support/icon/add-to-cart.svg";
import NotFound from "./notfound";

class Cart extends Component {
  state = { cart: [], toOrder: false };

  componentDidMount() {
    this.getCart();
  }

  getCart = () => {
    const { id } = this.props;

    Axios.get(`${APIURL}trans/getdetailcart/${id}`)
      .then(res => {
        this.setState({ cart: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteCart = id => {
    let data = { id, usersId: this.props.id };

    Axios.post(`${APIURL}trans/deletecart`, data)
      .then(res => {
        if (res.data.message === "delete berhasil") {
          this.props.getCart();
          this.notify();
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.getCart();
      });
  };

  plusQty = id => {
    console.log(id);
  };

  minQty = id => {
    console.log(id);
  };

  onCheckout = () => {
    console.log(this.state.cart);
    let dataTrans = this.state.cart;
    let tot = 0;
    this.state.cart.forEach(val => {
      tot += val.qty * val.harga;
    });
    let usersId = this.props.id;
    let data = { usersId, totalBelanja: tot, dataTrans };

    Axios.post(`${APIURL}trans/checkout`, data)
      .then(res => {
        console.log(res);
        this.props.getCart();
        this.setState({ toOrder: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  notify = () => {
    toast.success("Item Berhasil Dihapus Dari Cart");
  };

  renderTotalBelanja = () => {
    let tot = 0;
    this.state.cart.forEach(val => {
      tot += val.qty * val.harga;
    });

    return "Rp " + Numeral(tot).format("0,0");
  };

  renderCart = () => {
    if (this.state.cart.length) {
      return this.state.cart.map((val, index) => {
        return (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <img
                    src={`${APIURL + val.image}`}
                    alt=""
                    height={150}
                    width={150}
                  />
                </Col>
                <Col>
                  <Link
                    to={`/detail-produk/${val.productsId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Row style={{ fontSize: 18, color: "black" }}>
                      {val.namaProduk}
                    </Row>
                  </Link>
                  <Row style={{ color: "tomato", fontWeight: "bolder" }}>
                    {"Rp " + Numeral(val.harga).format("0,0")}
                  </Row>
                  <Row>{val.qty} pcs</Row>
                  <br />
                  <br />
                  <Link
                    to={`/detail-toko/${val.sellerId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Row style={{ color: "grey" }}>
                      <AiTwotoneShop className="mt-1 mr-2" /> {val.namatoko}
                    </Row>
                  </Link>
                </Col>
                <Col>
                  <Row>
                    Total :
                    <span
                      className="ml-2"
                      style={{ color: "tomato", fontWeight: "bolder" }}
                    >
                      {"Rp " + Numeral(val.totharga).format("0,0")}
                    </span>
                  </Row>
                  <br />
                  <Row></Row>
                </Col>
                <Col>
                  <div style={{ float: "right" }}>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Hapus dari Keranjang</Tooltip>}
                    >
                      <Button
                        variant="danger"
                        onClick={() => this.deleteCart(val.id)}
                      >
                        <FiTrash2 />
                      </Button>
                    </OverlayTrigger>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    } else {
      //ELSE KALO USER BELOM ADA ITEM DI CART
    }
  };

  render() {
    if (!this.props.login) {
      return <Redirect to="/" />;
    }
    if (this.state.toOrder) {
      return <Redirect to="/order" />;
    }
    if (this.state.cart === null) {
      return <Loading />;
    }
    if (this.props.role !== 3) {
      return <NotFound />;
    }
    console.log(this.state);
    if (this.props.cart === 0) {
      return (
        <div>
          <div className="container mb-5">
            <div className="mt-5">
              <h2 className="kix">Cart</h2>
              <hr />
              <div className="text-center">
                <img
                  className="mt-5"
                  src={cart}
                  alt=""
                  width={100}
                  height={100}
                />
                <p className="mt-5 ">Oops. Keranjangmu Masih Kosong</p>
                <p className="mt-1 ">Silahkan Belanja Terlebih Dahulu</p>
                <Button variant="info" className="mt-5">
                  To Shop
                </Button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div>
        <div className="container mb-5">
          <div className="mt-5">
            <h2 className="kix">Cart</h2>
            <hr />
            <div>
              <Row>
                <Col lg={8}>{this.renderCart()}</Col>
                <Col>
                  <Card>
                    <Card.Body>
                      <Row
                        style={{
                          color: "tomato",
                          fontWeight: "bolder",
                          marginBottom: "2rem"
                        }}
                      >
                        <div
                          style={{ marginLeft: "auto", marginRight: "auto" }}
                        >
                          Total Belanja : {this.renderTotalBelanja()}
                        </div>
                      </Row>
                      <Row>
                        <Button
                          variant="success"
                          style={{ width: "100%", margin: "1rem" }}
                          onClick={this.onCheckout}
                        >
                          Checkout
                        </Button>
                      </Row>
                      <Row>
                        <Button
                          variant="secondary"
                          style={{ width: "100%", margin: "1rem" }}
                        >
                          Belanja Lagi
                        </Button>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <ToastContainer
          transition={Slide}
          position="bottom-right"
          autoClose={2500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable={false}
          pauseOnHover={false}
        />
        <Footer />
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    id: state.auth.id,
    login: state.auth.login,
    cart: state.cart.cart,
    role: state.cart.roleId
  };
};

export default connect(MapstateToprops, { getCart })(Cart);

//GANTI QUANTITY CART
//BUTTON CHECKOUT
//BUTTON KE HALAMAN SHOP
//BIKIN TOTAL HARGA
//KASIH MODAL KLIK DELETE
//NOTIF CART MASIH BUG
