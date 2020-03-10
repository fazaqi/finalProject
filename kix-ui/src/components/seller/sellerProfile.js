import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";
import { Form, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

class UserProfile extends Component {
  state = {};

  componentDidMount() {
    const { id, role } = this.props;
    // console.log(id, role);
    Axios.post(`${APIURL}manage/getuser`, { id, role })
      .then(res => {
        console.log(res.data[0]);
        let { namatoko, nomorhp, alamattoko, deskripsitoko } = res.data[0];
        this.setState({ namatoko, nomorhp, alamattoko, deskripsitoko });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

  notify = () => toast.success("Data Berhasil Diubah.");

  btnSimpan = () => {
    let namatoko = this.refs.namatoko.value;
    let nomorhp = this.refs.hp.value;
    let alamattoko = this.refs.alamat.value;
    let deskripsitoko = this.refs.deskripsi.value;

    let data = { namatoko, alamattoko, deskripsitoko, nomorhp };
    console.log(data);

    Axios.put(`${APIURL}manage/updatetoko/${this.props.id}`, data)
      .then(res => {
        console.log(res);
        this.notify();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="profile-content">
        <h2 className="kix mb-5">Profil</h2>
        <Form>
          {/* NAMA TOKO */}
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Nama Toko<span className="redstar">*</span>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref="namatoko"
                defaultValue={this.state.namatoko}
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
              Nomor HP<span className="redstar">*</span>
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                ref="hp"
                defaultValue={this.state.nomorhp}
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
                defaultValue={this.state.alamattoko}
              />
            </Col>
          </Form.Group>

          {/* DESKRIPSI TOKO */}
          <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
            <Form.Label column sm={2}>
              Deskripsi
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                rows="5"
                ref="deskripsi"
                defaultValue={this.state.deskripsitoko}
              />
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
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.auth.login,
    email: state.auth.email,
    id: state.auth.id,
    nama: state.auth.namatoko,
    role: state.auth.roleId
  };
};

export default connect(mapStateToProps)(UserProfile);
