import React, { Component } from "react";
import Footer from "../../components/footer";
import { Row, Col, Tab, Nav, Card, Button, Modal } from "react-bootstrap";
import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";
import Numeral from "numeral";
import Loading from "../../components/loading";
import order from "../../support/icon/order.svg";

class Pembayaran extends Component {
  state = {
    waitConfirm: [],
    doneTrans: [],
    declinedTrans: [],
    indexTolak: null,
    indexTerima: null,
    modalTolak: false,
    modalTerima: false,
    loading: false
  };

  componentDidMount() {
    this.getTrans();
  }

  getTrans = () => {
    Axios.get(`${APIURL}admin/gettrans`)
      .then(res => {
        // console.log(res.data);
        var waitConf = [];
        var transDone = [];
        var declined = [];
        res.data.map(val => {
          if (val.status === "onPaymentConfirmation") {
            return waitConf.push(val);
          } else if (val.status === "paid") {
            return transDone.push(val);
          } else if (val.status === "declined") {
            return declined.push(val);
          }
        });
        this.setState({
          waitConfirm: waitConf,
          doneTrans: transDone,
          declinedTrans: declined
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderTrans = () => {
    if (this.state.waitConfirm.length) {
      return this.state.waitConfirm.map((val, index) => {
        return (
          <Card key={index} style={{ marginBottom: "1rem" }}>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <Row>Bukti Bayar:</Row>
                  <br />
                  <Row>
                    <img
                      src={`${APIURL + val.buktibayar}`}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </Row>
                </Col>
                <Col>
                  <Row style={{ color: "grey" }}>Order ID : {val.id}</Row>
                  <Row>Nama Pembeli: {val.nama}</Row>
                  <Row>
                    Total yang harus dibayar :
                    <span
                      className="ml-2"
                      style={{ color: "tomato", fontWeight: "bolder" }}
                    >
                      {"Rp " + Numeral(val.totalharga).format("0,0")}
                    </span>
                  </Row>

                  <Row>Status Pesanan : {val.status}</Row>
                  <br />
                  <br />
                  <Row>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() =>
                          this.setState({
                            modalTolak: true,
                            indexTolak: val.id
                          })
                        }
                      >
                        Tolak Pembayaran
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="success"
                        onClick={() =>
                          this.setState({
                            modalTerima: true,
                            indexTerima: val.id
                          })
                        }
                      >
                        Terima Pembayaran
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    } else {
      return (
        <div className="text-center" style={{ paddingTop: "3rem" }}>
          <img src={order} alt="" width={100} height={100} />
          <p style={{ color: "grey", marginTop: "1rem" }}>
            Belum Ada Pembayaran...
          </p>
        </div>
      );
    }
  };

  renderPaid = () => {
    if (this.state.doneTrans.length) {
      return this.state.doneTrans.map((val, index) => {
        return (
          <Card key={index} style={{ marginBottom: "1rem" }}>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <Row>Bukti Bayar:</Row>
                  <br />
                  <Row>
                    <img
                      src={`${APIURL + val.buktibayar}`}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </Row>
                </Col>
                <Col>
                  <Row style={{ color: "grey" }}>Order ID : {val.id}</Row>
                  <Row>Nama Pembeli: {val.nama}</Row>
                  <Row>
                    Total yang harus dibayar :
                    <span
                      className="ml-2"
                      style={{ color: "tomato", fontWeight: "bolder" }}
                    >
                      {"Rp " + Numeral(val.totalharga).format("0,0")}
                    </span>
                  </Row>

                  <Row>Status Pesanan : {val.status}</Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    } else {
      return (
        <div className="text-center" style={{ paddingTop: "3rem" }}>
          <img src={order} alt="" width={100} height={100} />
          <p style={{ color: "grey", marginTop: "1rem" }}>Belum Ada Data...</p>
        </div>
      );
    }
  };

  renderDeclined = () => {
    if (this.state.declinedTrans.length) {
      return this.state.declinedTrans.map((val, index) => {
        return (
          <Card key={index} style={{ marginBottom: "1rem" }}>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <Row>Bukti Bayar:</Row>
                  <br />
                  <Row>
                    <img
                      src={`${APIURL + val.buktibayar}`}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </Row>
                </Col>
                <Col>
                  <Row style={{ color: "grey" }}>Order ID : {val.id}</Row>
                  <Row>Nama Pembeli: {val.nama}</Row>
                  <Row>
                    Total yang harus dibayar :
                    <span
                      className="ml-2"
                      style={{ color: "tomato", fontWeight: "bolder" }}
                    >
                      {"Rp " + Numeral(val.totalharga).format("0,0")}
                    </span>
                  </Row>

                  <Row>Status Pesanan : {val.status}</Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    } else {
      return (
        <div className="text-center" style={{ paddingTop: "3rem" }}>
          <img src={order} alt="" width={100} height={100} />
          <p style={{ color: "grey", marginTop: "1rem" }}>Belum Ada Data...</p>
        </div>
      );
    }
  };

  terimaPayment = () => {
    if (this.state.indexTerima !== null) {
      let id = this.state.indexTerima;
      Axios.put(`${APIURL}admin/terimapayment/${id}`)
        .then(res => {
          if (res.data.message === "Pembayaran Diterima") {
            this.setState({
              modalTerima: false,
              loading: true,
              indexTerima: null
            });
            this.getTrans();
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

  tolakPayment = () => {
    if (this.state.indexTolak !== null) {
      let id = this.state.indexTolak;
      Axios.put(`${APIURL}admin/tolakpayment/${id}`)
        .then(res => {
          if (res.data.message === "Pembayaran Ditolak") {
            this.setState({
              loading: true,
              modalTolak: false,
              indexTolak: null
            });
            this.getTrans();
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

  render() {
    console.log(this.state);
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div>
        <div className="container mb-5">
          <h2 className="kix mt-5 mb-5 text-center">Pembayaran</h2>
          <hr />
          <div className="mt-5">
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item style={{ height: "5vh", marginBottom: "1rem" }}>
                      <Nav.Link eventKey="1" onClick={this.semuaPesanan}>
                        Menunggu Konfirmasi
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ height: "5vh", marginBottom: "1rem" }}>
                      <Nav.Link eventKey="2">Telah Dibayar</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ height: "5vh", marginBottom: "1rem" }}>
                      <Nav.Link eventKey="3">Pembayaran Ditolak</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="1">{this.renderTrans()}</Tab.Pane>
                    <Tab.Pane eventKey="2">{this.renderPaid()}</Tab.Pane>
                    <Tab.Pane eventKey="3">{this.renderDeclined()}</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>

        {/* TOLAK PEMBAYARAN */}
        <Modal
          show={this.state.modalTolak}
          onHide={() => this.setState({ modalTolak: false, indexTolak: null })}
          size="sm"
          centered
        >
          <Modal.Body>Anda Yakin Ingin Tolak Pembayaran Ini?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.tolakPayment}>
              Ya
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({ modalTolak: false, indexTolak: null })
              }
            >
              Tidak
            </Button>
          </Modal.Footer>
        </Modal>

        {/* TERIMA PEMBAYARAN */}
        <Modal
          show={this.state.modalTerima}
          onHide={() =>
            this.setState({ modalTerima: false, indexTerima: null })
          }
          size="sm"
          centered
        >
          <Modal.Body>Terima Pembayaran Ini?</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.terimaPayment}>
              Ya
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({ modalTerima: false, indexTerima: null })
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

export default Pembayaran;
