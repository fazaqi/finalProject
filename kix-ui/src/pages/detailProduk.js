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
  FormControl,
  Modal
} from "react-bootstrap";
import Numeral from "numeral";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCart } from "../redux/actions";
import { Redirect } from "react-router-dom";

class DetailProduk extends Component {
  state = {
    produk: "",
    qty: 1,
    modalToCart: false,
    redirectCart: false,
    modalToLogin: false,
    redirectLogin: false,
    redirectRegister: false
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
    if (this.props.login) {
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
          this.setState({ modalToCart: true });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ modalToLogin: true });
    }
  };

  render() {
    let { produk } = this.state;
    console.log(this.state.qty);
    console.log(produk);
    if (this.state.redirectCart) {
      return <Redirect to="/cart" />;
    }
    if (this.state.redirectLogin) {
      return <Redirect to="/login" />;
    }
    if (this.state.redirectRegister) {
      return <Redirect to="/register" />;
    }
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

          {/* MODAL BERHASIL BELI */}
          <Modal
            show={this.state.modalToCart}
            onHide={() =>
              this.setState({
                modalToCart: !this.state.modalToCart
              })
            }
            size="sm"
            centered
          >
            <Modal.Body>
              <p>Hore! Produk Berhasil Ditambahkan ke Cart</p>

              <p>Ingin ke Halaman Cart sekarang?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="info"
                onClick={() => this.setState({ redirectCart: true })}
              >
                Ya
              </Button>
              <Button
                variant="warning"
                onClick={() => this.setState({ modalToCart: false })}
              >
                Tidak, Nanti Saja
              </Button>
            </Modal.Footer>
          </Modal>

          {/* MODAL BELUM LOGIN */}
          <Modal
            show={this.state.modalToLogin}
            onHide={() =>
              this.setState({
                modalToLogin: !this.state.modalToLogin
              })
            }
            size="sm"
            centered
          >
            <Modal.Body>
              Anda Harus Daftar atau Login terlebih dahulu untuk membeli Produk
              ini
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="info"
                onClick={() => this.setState({ redirectLogin: true })}
              >
                Login
              </Button>
              <Button
                variant="warning"
                onClick={() => this.setState({ redirectRegister: true })}
              >
                Register
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>

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

export default connect(MapstateToprops, { getCart })(DetailProduk);

//Proteksi Jika Akun Penjual atau admin mau beli
