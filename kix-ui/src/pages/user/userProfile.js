import React, { Component } from "react";

//Component
import userimg from "../../support/icon/user.svg";
import Footer from "../../components/footer";

//Style
import { Form, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

//Utility
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, updateUser, getDetail } from "../../redux/actions";
import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";
import NotFound from "../notfound";

class Profile extends Component {
  state = {};

  // async componentDidMount() {
  //   try {
  //     console.log("masuk did");
  //     const { id, role } = this.props;
  //     await this.props.getDetailUser(id, role);
  //     this.setState({ jeniskelamin: this.props.jeniskelamin });
  //     console.log(this.state);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ jeniskelamin: e.target.value });
  };

  btnSimpan = () => {
    let nama = this.refs.nama.value;
    let nomorhp = this.refs.hp.value;
    let alamat = this.refs.alamat.value;
    let jeniskelamin = this.refs.jeniskelamin.value;

    let data = { nama, alamat, jeniskelamin, nomorhp };

    this.props.updateUser(this.props.id, data);
    this.notify();
    setTimeout(() => this.props.getUser(), 2500);
  };

  render() {
    if (this.props.login === false) {
      return <Redirect to="/" />;
    }
    if (this.props.role !== 3) {
      return <NotFound />;
    }

    return (
      <div>
        <div className="container mb-5">
          <div className="d-flex pt-5 pr-5">
            <img
              src={userimg}
              alt="userimg"
              style={{ height: "150px", width: "150px" }}
            />
            <div className="p-5">
              <div className="profile-usertitle-name">
                {/* {this.props.nama.nama || this.props.nama.namatoko} */}
                {this.props.nama}
              </div>
              <div className="profile-usertitle-job">
                {this.props.role === 3
                  ? "USER"
                  : this.props.role === 2
                  ? "SELLER"
                  : null}
              </div>
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
                    ref="nama"
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

              {/* JENIS KELAMIN */}
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Jenis Kelamin
                </Form.Label>
                <Col sm={10} className="mt-1">
                  <Form.Control
                    as="select"
                    ref="jeniskelamin"
                    value={this.state.jeniskelamin}
                    onChange={this.handleChange}
                  >
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              {/* NO HP */}
              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                  Nomor HP<span className="redstar">*</span>
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    ref="hp"
                    defaultValue={this.props.nomorhp}
                  />
                </Col>
              </Form.Group>

              {/* ALAMAT */}
              <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                <Form.Label column sm={2}>
                  Alamat<span className="redstar">*</span>
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    rows="5"
                    ref="alamat"
                    defaultValue={this.props.alamat}
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
    nama: state.auth.nama,
    role: state.auth.roleId,
    id: state.auth.id,
    /////
    jeniskelamin: state.user.jeniskelamin,
    alamat: state.user.alamat,
    nomorhp: state.user.nomorhp,
    loading: state.user.loading
  };
};

export default connect(mapStateToProps, {
  getUser,
  updateUser,
  getDetail
})(Profile);

//Belum ada Proteksi jika ada yang kosong
