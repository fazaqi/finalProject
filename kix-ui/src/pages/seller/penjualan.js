import React, { Component } from "react";
import { Row, Col, Tab, Nav, Card, Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";
import { Link, Redirect } from "react-router-dom";
import Numeral from "numeral";
import Footer from "../../components/footer";
import NotFound from "../notfound";

class Penjualan extends Component {
  state = {
    onProcess: [],
    onShipment: [],
    doneTrans: [],
    modalKirim: false,
    indexKirim: null,
    loading: false
  };

  componentDidMount() {
    this.getOnProcess();
    this.getOnShipment();
    this.getFinishedTrans();
  }

  getOnProcess = () => {
    if (this.props.id) {
      Axios.get(`${APIURL}seller/gettrans/${this.props.id}`)
        .then(res => {
          //   console.log(res.data);
          this.setState({ onProcess: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  renderOnProcess = () => {
    if (this.state.onProcess.length) {
      return this.state.onProcess.map((val, index) => {
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
                  <Row>Status Pesanan : Menunggu Dikirim</Row>
                  <br />
                  <Row>
                    <Button
                      variant="info"
                      onClick={() =>
                        this.setState({ modalKirim: true, indexKirim: val.id })
                      }
                    >
                      Kirim Barang
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

  kirimBarang = () => {
    if (this.state.indexKirim !== null) {
      let data = { id: this.state.indexKirim, sellerId: this.props.id };
      console.log(data);
      Axios.put(`${APIURL}seller/sendproduk`, data)
        .then(res => {
          if (res.data.message === "Berhasil Dikirim") {
            this.setState({
              modalKirim: false,
              indexKirim: null,
              loading: true
            });
            this.getOnProcess();
            this.getOnShipment();
            this.getFinishedTrans();
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

  getOnShipment = () => {
    if (this.props.id) {
      Axios.get(`${APIURL}seller/getship/${this.props.id}`)
        .then(res => {
          //   console.log(res.data);
          this.setState({ onShipment: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  renderOnShipment = () => {
    if (this.state.onShipment.length) {
      return this.state.onShipment.map((val, index) => {
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
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    }
  };

  getFinishedTrans = () => {
    if (this.props.id) {
      Axios.get(`${APIURL}seller/getfinish/${this.props.id}`)
        .then(res => {
          //   console.log(res.data);
          this.setState({ doneTrans: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  renderFinished = () => {
    if (this.state.doneTrans.length) {
      return this.state.doneTrans.map((val, index) => {
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
                  <Row>Status Pesanan : Transaksi Selesai</Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    }
  };

  render() {
    console.log(this.state);
    if (this.props.role !== 2) {
      return <NotFound />;
    }
    if (this.props.login === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="container mb-5">
          <h2 className="kix mt-5 mb-5 text-center">Penjualan</h2>
          <hr />
          <div className="mt-5">
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item style={{ height: "5vh", marginBottom: "1rem" }}>
                      <Nav.Link eventKey="1" onClick={this.semuaPesanan}>
                        Menunggu Diproses
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ height: "5vh", marginBottom: "1rem" }}>
                      <Nav.Link eventKey="2">Dalam Pengiriman</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ height: "5vh", marginBottom: "1rem" }}>
                      <Nav.Link eventKey="3">Transaksi Selesai</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="1">{this.renderOnProcess()}</Tab.Pane>
                    <Tab.Pane eventKey="2">{this.renderOnShipment()}</Tab.Pane>
                    <Tab.Pane eventKey="3">{this.renderFinished()}</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
        <Modal
          show={this.state.modalKirim}
          onHide={() => this.setState({ modalKirim: false, indexKirim: null })}
          size="sm"
          centered
        >
          <Modal.Body>Anda Sudah Mengirim Barang Ini?</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.kirimBarang}>
              Ya
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({ modalKirim: false, indexKirim: null })
              }
            >
              Tidak
            </Button>
          </Modal.Footer>
        </Modal>
        <Footer />
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    id: state.auth.id,
    login: state.auth.login,
    role: state.auth.roleId
  };
};

export default connect(MapstateToprops)(Penjualan);
