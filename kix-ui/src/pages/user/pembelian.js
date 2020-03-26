import React, { Component } from "react";
import { Row, Col, Tab, Nav, Card, Button, Modal, Form } from "react-bootstrap";
import Loading from "../../components/loading";
import Footer from "../../components/footer";
import { connect } from "react-redux";
import order from "../../support/icon/order.svg";
import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";
import { Link, Redirect } from "react-router-dom";
import Numeral from "numeral";
import { AiTwotoneShop } from "react-icons/ai";
import NotFound from "../notfound";

class Pembelian extends Component {
  state = {
    semuaPesanan: [],
    belumDibayar: [],
    detailBelumBayar: [],
    sedangDiproses: [],
    dalamPengiriman: [],
    pesananSelesai: [],
    pesananBatal: [],
    indexCancel: null,
    indexBayar: null,
    indexTerima: null,
    modalDetail: false,
    modalBayar: false,
    modalCancel: false,
    modalTerima: false,
    gambar: null,
    loading: false
  };

  componentDidMount() {
    this.getTransDetail();
    this.getUnpaidTrans();
  }

  getTransDetail = () => {
    console.log(this.props.id);
    if (this.props.id) {
      Axios.get(`${APIURL}trans/alltrans/${this.props.id}`)
        .then(res => {
          this.setState({ semuaPesanan: res.data });

          var onProcess = [];
          var dalamPengiriman = [];
          var pesananSelesai = [];
          var pesananBatal = [];
          res.data.map((val, index) => {
            if (
              val.status === "onProcess" ||
              val.status === "onPaymentConfirmation"
            ) {
              return onProcess.push(val);
            } else if (val.status === "onShipment") {
              return dalamPengiriman.push(val);
            } else if (val.status === "finished") {
              return pesananSelesai.push(val);
            } else if (val.status === "cancelled") {
              return pesananBatal.push(val);
            }
          });

          this.setState({
            sedangDiproses: onProcess,
            dalamPengiriman: dalamPengiriman,
            pesananSelesai: pesananSelesai,
            pesananBatal: pesananBatal
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  getUnpaidTrans = () => {
    Axios.get(`${APIURL}trans/unpaidtrans/${this.props.id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.length) {
          this.setState({ belumDibayar: res.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  getDetailUnpaid = index => {
    let data = { id: this.props.id, paymentId: index };
    console.log(data);
    Axios.post(`${APIURL}trans/detailtrans`, data)
      .then(res => {
        console.log(res.data);
        if (res.data.length) {
          this.setState({ detailBelumBayar: res.data, modalDetail: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderDetailUnpaid = () => {
    if (this.state.detailBelumBayar) {
      return this.state.detailBelumBayar.map((val, index) => {
        return (
          <Card key={index} style={{ marginBottom: "1rem" }}>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <Row style={{ color: "grey" }}>Order ID : {val.orderId}</Row>
                  <br />
                  <Row>
                    <img
                      src={`${APIURL + val.image}`}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </Row>
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
                      {"Rp " + Numeral(val.totHarga).format("0,0")}
                    </span>
                  </Row>
                  <br />
                  <Row>Status Pesanan : {val.status}</Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    }
  };

  getImage = e => {
    this.setState({ gambar: e.target.files });
  };

  renderSemuaPesanan = () => {
    console.log(this.state);
    if (this.state.semuaPesanan.length === 0) {
      return (
        <div className="text-center" style={{ paddingTop: "3rem" }}>
          <img src={order} alt="" width={100} height={100} />
          <p style={{ color: "grey", marginTop: "1rem" }}>
            Belum Ada Pesanan...
          </p>
        </div>
      );
    } else {
      return this.state.semuaPesanan.map((val, index) => {
        return (
          <Card key={index} style={{ marginBottom: "1rem" }}>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <Row style={{ color: "grey" }}>Order ID : {val.orderId}</Row>
                  <br />
                  <Row>
                    <img
                      src={`${APIURL + val.image}`}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </Row>
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
                      {"Rp " + Numeral(val.totHarga).format("0,0")}
                    </span>
                  </Row>
                  <br />
                  <Row>Status Pesanan : {val.status}</Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    }
  };

  renderBelumDibayar = () => {
    if (this.state.belumDibayar.length === 0) {
      return (
        <div className="text-center" style={{ paddingTop: "3rem" }}>
          <img src={order} alt="" width={100} height={100} />
          <p style={{ color: "grey", marginTop: "1rem" }}>
            Belum Ada Pesanan...
          </p>
        </div>
      );
    } else {
      return this.state.belumDibayar.map((val, index) => {
        return (
          <Card key={index} style={{ marginBottom: "1rem" }}>
            <Card.Body>
              <Row>
                <Col sm={3}>Order Id : {val.id}</Col>
                <Col sm={3}>
                  <Row>Total yang Harus Dibayar : </Row>
                  <Row>
                    <span style={{ color: "tomato", fontWeight: "bolder" }}>
                      {"Rp " + Numeral(val.totalharga).format("0,0")}
                    </span>
                  </Row>
                </Col>
                <Col>
                  <div style={{ float: "right" }}>
                    <Button
                      variant="danger"
                      onClick={() =>
                        this.setState({
                          modalCancel: true,
                          indexCancel: val.id
                        })
                      }
                    >
                      Batalkan Pesanan
                    </Button>
                    <Button
                      className="ml-3"
                      variant="info"
                      onClick={() => this.getDetailUnpaid(val.id)}
                    >
                      Detail
                    </Button>
                    <Button
                      className="ml-3"
                      variant="success"
                      onClick={() =>
                        this.setState({ modalBayar: true, indexBayar: val.id })
                      }
                    >
                      Upload Bukti Bayar
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    }
  };

  cancelOrder = () => {
    Axios.put(`${APIURL}trans/cancelorder/${this.state.indexCancel}`)
      .then(res => {
        console.log(res);
        this.setState({ modalCancel: false, indexCancel: null, loading: true });
        this.getTransDetail();
        this.getUnpaidTrans();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  onBayar = () => {
    console.log(this.state.indexBayar);
    console.log(this.state.gambar);
    if (this.state.gambar) {
      let formdata = new FormData();
      let Headers = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      let idTrans = this.state.indexBayar;
      let gambar = this.state.gambar[0];
      let data = { id: idTrans };
      formdata.append("image", gambar);
      formdata.append("data", JSON.stringify(data));

      console.log(formdata);

      Axios.post(`${APIURL}trans/uploadpayment`, formdata, Headers)
        .then(res => {
          console.log(res);
          if (res.data.message === "Pembayaran Diterima") {
            this.setState({ modalBayar: false, gambar: null, loading: true });
            this.getTransDetail();
            this.getUnpaidTrans();
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  };

  renderSedangDiproses = () => {
    if (this.state.sedangDiproses.length === 0) {
      return (
        <div className="text-center" style={{ paddingTop: "3rem" }}>
          <img src={order} alt="" width={100} height={100} />
          <p style={{ color: "grey", marginTop: "1rem" }}>
            Belum Ada Pesanan...
          </p>
        </div>
      );
    } else {
      return this.state.sedangDiproses.map((val, index) => {
        return (
          <Card key={index} style={{ marginBottom: "1rem" }}>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <Row style={{ color: "grey" }}>Order ID : {val.orderId}</Row>
                  <br />
                  <Row>
                    <img
                      src={`${APIURL + val.image}`}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </Row>
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
                      {"Rp " + Numeral(val.totHarga).format("0,0")}
                    </span>
                  </Row>
                  <br />
                  <Row>Status Pesanan : {val.status}</Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    }
  };

  renderDalamPengiriman = () => {
    if (this.state.dalamPengiriman.length === 0) {
      return (
        <div className="text-center" style={{ paddingTop: "3rem" }}>
          <img src={order} alt="" width={100} height={100} />
          <p style={{ color: "grey", marginTop: "1rem" }}>
            Belum Ada Pesanan...
          </p>
        </div>
      );
    } else {
      return this.state.dalamPengiriman.map((val, index) => {
        return (
          <Card key={index} style={{ marginBottom: "1rem" }}>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <Row style={{ color: "grey" }}>Order ID : {val.orderId}</Row>
                  <br />
                  <Row>
                    <img
                      src={`${APIURL + val.image}`}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </Row>
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
                      {"Rp " + Numeral(val.totHarga).format("0,0")}
                    </span>
                  </Row>
                  <br />
                  <Row>Status Pesanan : Dalam Pengiriman</Row>
                  <br />
                  <br />
                  <Row>
                    <Button
                      variant="info"
                      onClick={() =>
                        this.setState({
                          modalTerima: true,
                          indexTerima: val.id
                        })
                      }
                    >
                      Konfirmasi Terima Barang
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    }
  };

  terimaBarang = () => {
    if (this.state.indexTerima !== null) {
      let data = { id: this.state.indexTerima, usersId: this.props.id };
      Axios.post(`${APIURL}trans/terimabarang`, data)
        .then(res => {
          if (res.data.message === "Transaksi Selesai") {
            this.setState({
              modalTerima: false,
              indexTerima: null,
              loading: true
            });
            this.getTransDetail();
            this.getUnpaidTrans();
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  };

  renderPesananSelesai = () => {
    if (this.state.pesananSelesai.length === 0) {
      return (
        <div className="text-center" style={{ paddingTop: "3rem" }}>
          <img src={order} alt="" width={100} height={100} />
          <p style={{ color: "grey", marginTop: "1rem" }}>
            Belum Ada Pesanan...
          </p>
        </div>
      );
    } else {
      return this.state.pesananSelesai.map((val, index) => {
        return (
          <Card key={index} style={{ marginBottom: "1rem" }}>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <Row style={{ color: "grey" }}>Order ID : {val.orderId}</Row>
                  <br />
                  <Row>
                    <img
                      src={`${APIURL + val.image}`}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </Row>
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
                      {"Rp " + Numeral(val.totHarga).format("0,0")}
                    </span>
                  </Row>
                  <br />
                  <Row>Status Pesanan : Selesai</Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    }
  };

  renderPesananDibatalkan = () => {
    if (this.state.pesananBatal.length === 0) {
      return (
        <div className="text-center" style={{ paddingTop: "3rem" }}>
          <img src={order} alt="" width={100} height={100} />
          <p style={{ color: "grey", marginTop: "1rem" }}>
            Belum Ada Pesanan...
          </p>
        </div>
      );
    } else {
      return this.state.pesananBatal.map((val, index) => {
        return (
          <Card key={index} style={{ marginBottom: "1rem" }}>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <Row style={{ color: "grey" }}>Order ID : {val.orderId}</Row>
                  <br />
                  <Row>
                    <img
                      src={`${APIURL + val.image}`}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </Row>
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
                      {"Rp " + Numeral(val.totHarga).format("0,0")}
                    </span>
                  </Row>
                  <br />
                  <Row>Status Pesanan : {val.status}</Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    }
  };

  render() {
    if (this.props.login === false) {
      return <Redirect to="/" />;
    }
    if (this.props.role !== 3) {
      return <NotFound />;
    }
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div>
        <div className="container mb-5">
          <h2 className="kix mt-5 mb-5 text-center">Pembelian</h2>
          <hr />
          <div className="mt-5">
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item style={{ height: "5vh", marginBottom: "1rem" }}>
                      <Nav.Link eventKey="1">Semua Pesanan</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ height: "5vh", marginBottom: "1rem" }}>
                      <Nav.Link eventKey="2">Belum Dibayar</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ height: "5vh", marginBottom: "1rem" }}>
                      <Nav.Link eventKey="3">Sedang Diproses</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ height: "5vh", marginBottom: "1rem" }}>
                      <Nav.Link eventKey="4">Dalam Pengiriman</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ height: "5vh", marginBottom: "1rem" }}>
                      <Nav.Link eventKey="5">Pesanan Selesai</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ height: "5vh", marginBottom: "1rem" }}>
                      <Nav.Link eventKey="6">Pesanan Dibatalkan</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="1">
                      {this.renderSemuaPesanan()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="2">
                      {this.renderBelumDibayar()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="3">
                      {this.renderSedangDiproses()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="4">
                      {this.renderDalamPengiriman()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="5">
                      {this.renderPesananSelesai()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="6">
                      {this.renderPesananDibatalkan()}
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
          {/* MODAL DETAIL TRANS */}
          <Modal
            show={this.state.modalDetail}
            onHide={() => this.setState({ modalDetail: false })}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Detail Transaksi
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.renderDetailUnpaid()}</Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ modalDetail: false })}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* MODAL CANCEL */}
          <Modal
            show={this.state.modalCancel}
            onHide={() =>
              this.setState({ modalCancel: false, indexCancel: null })
            }
            size="lg"
            centered
          >
            <Modal.Body>Anda Yakin Ingin Batalkan Pesanan Ini?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.cancelOrder}>
                Ya
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  this.setState({ modalCancel: false, indexCancel: null })
                }
              >
                Tidak
              </Button>
            </Modal.Footer>
          </Modal>

          {/* MODAL BAYAR */}
          <Modal
            show={this.state.modalBayar}
            onHide={() => this.setState({ modalBayar: false, gambar: null })}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Upload Bukti Bayar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group as={Row}>
                <Col sm={10}>
                  <Form.Control
                    type="file"
                    ref="gambar"
                    multiple={true}
                    onChange={this.getImage}
                  />
                </Col>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={this.onBayar}>
                Submit
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  this.setState({ modalBayar: false, gambar: null })
                }
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>

          {/* MODAL TERIMA BARANG */}
          <Modal
            show={this.state.modalTerima}
            onHide={() =>
              this.setState({ modalTerima: false, indexTerima: null })
            }
            size="sm"
            centered
          >
            <Modal.Body>Anda Sudah Menerima Barang Ini?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.terimaBarang}>
                Ya
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  this.setState({ modalTerima: false, indexTerima: null })
                }
              >
                Belum
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
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
    role: state.auth.roleId
  };
};

export default connect(MapstateToprops)(Pembelian);
