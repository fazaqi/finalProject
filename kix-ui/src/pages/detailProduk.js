import React, { Component } from "react";
import Axios from "axios";
import { APIURL } from "../helper/apiUrl";
import Footer from "../components/footer";
import Loading from "../components/loading";
import {
  Row,
  Col,
  Button,
  Container,
  InputGroup,
  FormControl
} from "react-bootstrap";
import Numeral from "numeral";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCart } from "../redux/actions";

class DetailProduk extends Component {
  state = {
    produk: "",
    qty: 1
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      Axios.get(`${APIURL}manage/getdetailprod/${id}`)
        .then(res => {
          this.setState({ produk: res.data[0] });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  plusQty = () => {
    if (this.state.qty !== this.state.produk.stok) {
      this.setState({ qty: this.state.qty + 1 });
    }
  };

  minQty = () => {
    if (this.state.qty !== 1) {
      this.setState({ qty: this.state.qty - 1 });
    }
  };

  addToCart = () => {
    let idproduk = this.state.produk.id;
    let iduser = this.props.id;
    let idseller = this.state.produk.usersId;
    let qty = this.state.qty;

    let data = { idproduk, iduser, idseller, qty };
    console.log(data);
    Axios.post(`${APIURL}trans/addtocart`, data)
      .then(res => {
        console.log(res);
        this.props.getCart();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let { produk } = this.state;
    console.log(this.state.qty);
    console.log(produk);
    if (produk.length === 0) {
      return <Loading />;
    }
    return (
      <div>
        <Container>
          <Row
            style={{
              marginTop: "7vh",
              marginBottom: "7vh"
            }}
          >
            <Col>
              <img
                src={`${APIURL + produk.image}`}
                alt="poster"
                style={{ height: "350px" }}
              />
            </Col>
            <Col>
              <div style={{ fontSize: 25, fontWeight: "bold" }}>
                {produk.namaProduk}
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4} style={{ color: "grey" }}>
                    Harga
                  </Col>
                  <Col style={{ color: "tomato", fontWeight: "bolder" }}>
                    {"Rp " + Numeral(produk.harga).format("0,0")}
                  </Col>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4} style={{ color: "grey" }}>
                    Stok Tersedia
                  </Col>
                  <Col>{produk.stok} pcs</Col>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4} style={{ color: "grey" }}>
                    Kategori Produk
                  </Col>
                  <Col>{produk.kategori}</Col>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4} style={{ color: "grey" }}>
                    Penjual
                  </Col>
                  <Link to={`/detail-toko/${produk.usersId}`} className="kix">
                    <Col>{produk.namatoko}</Col>
                  </Link>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4} style={{ color: "grey" }}>
                    Deskripsi
                  </Col>
                  <Col>{produk.deskripsi}</Col>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4} style={{ color: "grey" }}>
                    Jumlah Beli
                  </Col>
                  <Col>
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
                        value={this.state.qty}
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
                  </Col>
                </Row>
              </div>
              <hr />
              <Button
                style={{
                  marginLeft: "10px"
                }}
                variant="success"
                onClick={this.addToCart}
              >
                Tambah Ke Keranjang
              </Button>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    id: state.auth.id
  };
};

export default connect(MapstateToprops, { getCart })(DetailProduk);
