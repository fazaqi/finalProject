import React, { Component } from "react";

//Component
import shopimg from "../../support/icon/shop.svg";
import Footer from "../../components/footer";
import NotFound from "../notfound";

//Style
import { Form, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

//Utility
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, updateToko, getDetail } from "../../redux/actions";
import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";

class Profile extends Component {
  state = {};

  componentDidMount() {
    if (this.props.login) {
      const { id, role } = this.props;
      Axios.post(`${APIURL}manage/getuser`, { id, role })
        .then(res => {
          this.props.getDetail(res.data[0]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  notify = () => {
    console.log("toast");
    toast.success("Data Berhasil Diubah.");
  };

  btnSimpan = () => {
    let namatoko = this.refs.namatoko.value;
    let nomorhp = this.refs.hp.value;
    let alamattoko = this.refs.alamat.value;
    let deskripsitoko = this.refs.deskripsi.value;

    let data = { namatoko, alamattoko, deskripsitoko, nomorhp };
    console.log(data);

    this.props.updateToko(this.props.id, data);
    this.notify();
    setTimeout(() => this.props.getUser(), 2500);
  };

  render() {
    if (this.props.login === false) {
      return <Redirect to="/" />;
    }
    if (this.props.role !== 2) {
      return <NotFound />;
    }
    return (
      <div>
        <div className="container mb-5">
          <div className="d-flex pt-5 pr-5">
            <img
              src={shopimg}
              alt="shopimg"
              style={{ height: "150px", width: "150px" }}
            />
            <div className="p-5">
              <div className="profile-usertitle-name">{this.props.nama}</div>
              <div className="profile-usertitle-job">SELLER</div>
            </div>
          </div>
          <hr className="mt-4 mb-4" />
          <div>
            <h2 className="kix mb-5">Profil Saya</h2>
            <Form>
              {/* NAMA LENGKAP */}
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Nama Lengkap<span className="redstar">*</span>
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    ref="namatoko"
                    defaultValue={this.props.nama}
                  />
                </Col>
              </Form.Group>

              {/* EMAIL */}
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.props.email}
                  />
                </Col>
              </Form.Group>

              {/* NO HP */}
              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                  Kontak<span className="redstar">*</span>
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    ref="hp"
                    defaultValue={this.props.nomorhp}
                  />
                </Col>
              </Form.Group>

              {/* Domisili */}
              <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                <Form.Label column sm={2}>
                  Domisili Toko<span className="redstar">*</span>
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    ref="alamat"
                    defaultValue={this.props.alamat}
                  />
                </Col>
              </Form.Group>

              {/* DESKRIPSI TOKO */}
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Deskripsi Toko
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    rows="5"
                    ref="deskripsi"
                    defaultValue={this.props.deskripsi}
                  />
                </Col>
              </Form.Group>

              {/* BUTTON SIMPAN */}
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="button" onClick={this.btnSimpan} size="lg">
                    Simpan
                  </Button>
                  <Link to="/resetpass">
                    <Button variant="warning" className="ml-3" size="lg">
                      Ubah Password
                    </Button>
                  </Link>
                </Col>
              </Form.Group>
            </Form>
            <ToastContainer
              position="top-center"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable={false}
              pauseOnHover={false}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.auth.login,
    email: state.auth.email,
    nama: state.auth.namatoko,
    role: state.auth.roleId,
    id: state.auth.id,
    /////
    alamat: state.user.alamattoko,
    nomorhp: state.user.nomorhp,
    deskripsi: state.user.deskripsitoko
  };
};

export default connect(mapStateToProps, {
  getUser,
  updateToko,
  getDetail
})(Profile);

//Belum ada Proteksi jika ada yang kosong
