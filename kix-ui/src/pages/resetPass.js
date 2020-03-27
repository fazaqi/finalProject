import React, { Component } from "react";

//Component
import userimg from "./../support/icon/user.svg";
import Footer from "./../components/footer";

//Style
import { Form, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

//Utility
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDetail } from "./../redux/actions";
import Axios from "axios";
import { APIURL } from "./../helper/apiUrl";
import NotFound from "./notfound";

class ResetPass extends Component {
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

  btnSimpan = () => {
    let id = this.props.id;
    let passlama = this.refs.passlama.value;
    let passbaru = this.refs.passbaru.value;
    let repass = this.refs.repassword.value;

    if (passlama === "" || passbaru === "" || repass === "") {
      return this.notify("kosong");
    } else if (passbaru !== repass) {
      return this.notify("repass");
    }

    let data = { id, passlama, passbaru };
    console.log(data);
    Axios.post(`${APIURL}manage/resetpass`, data)
      .then(res => {
        console.log(res.data.message);
        if (res.data.message === "Pass Lama Salah") {
          this.notify("passsalah");
        } else if (res.data.message === "Update Pass Berhasil") {
          this.notify("berhasil");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  notify = message => {
    if (message === "repass") {
      toast.error("Password Baru tidak Match");
    } else if (message === "kosong") {
      toast.error("Tidak Boleh Ada yang Kosong ");
    } else if (message === "berhasil") {
      toast.success("Password Berhasil Diubah.");
    } else if (message === "passsalah") {
      toast.error("Password Lama Anda Salah ");
    }
  };

  render() {
    if (this.props.login === false) {
      return <Redirect to="/" />;
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
                {this.props.nama || this.props.namatoko}
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
            <h2 className="kix mb-5">Reset Password</h2>
            <Form>
              {/* NAMA LENGKAP */}
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Username
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    plaintext
                    readOnly
                    defaultValue={this.props.username}
                  />
                </Col>
              </Form.Group>

              {/* Password */}
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Password Lama
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="password" ref="passlama" />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Password Baru
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="password" ref="passbaru" />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Re-enter Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="password" ref="repassword" />
                </Col>
              </Form.Group>
              {/* BUTTON SIMPAN */}
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="button" onClick={this.btnSimpan} size="lg">
                    Simpan
                  </Button>
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
    namatoko: state.auth.namatoko,
    role: state.auth.roleId,
    id: state.auth.id,
    username: state.auth.username
  };
};

export default connect(mapStateToProps, { getDetail })(ResetPass);
