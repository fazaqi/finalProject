import React, { Component } from "react";

import {
  InputGroup,
  Card,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
  FormControl
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

class Cart extends Component {
  state = { cart: [] };

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

  notify = () => {
    toast.success("Item Berhasil Dihapus Dari Cart");
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
                  <Row className="ml-3">Quantity</Row>
                  <br />
                  <Row>
                    {/* /////// */}
                    <InputGroup style={{ width: "120px" }}>
                      <InputGroup.Prepend>
                        <Button
                          variant="outline-secondary"
                          onClick={this.minQty}
                        >
                          {" "}
                          -{" "}
                        </Button>
                      </InputGroup.Prepend>
                      <FormControl
                        type="number"
                        readOnly
                        defaultValue={val.qty}
                        style={{ textAlign: "center" }}
                      />
                      <InputGroup.Append>
                        <Button
                          variant="outline-secondary"
                          onClick={this.plusQty}
                        >
                          {" "}
                          +{" "}
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                    {/* ////// */}
                  </Row>
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
    if (this.state.cart === null) {
      return <Loading />;
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
                    <Card.Body>asdwasd</Card.Body>
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
    login: state.auth.login
  };
};

export default connect(MapstateToprops, { getCart })(Cart);

//GANTI QUANTITY CART
//BUTTON CHECKOUT
//BUTTON KE HALAMAN SHOP
//BIKIN TOTAL HARGA
//KASIH MODAL KLIK DELETE
//NOTIF CART MASIH BUG
