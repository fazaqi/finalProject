import React, { Component } from "react";
// import { connect } from "react-redux";
// import Axios from "axios";
// import { APIURL } from "../../helper/apiUrl";
import { Form, Row, Col, Button } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import { getDataUser } from "../../redux/actions";
import userimg from "../support/user.svg";

class Tes extends Component {
  state = {};

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div className="d-flex pt-5 pr-5">
          <img
            src={userimg}
            alt="userimg"
            style={{ height: "150px", width: "150px" }}
          />
          <div className="p-5">
            <div className="profile-usertitle-name">Bambang</div>
            <div className="profile-usertitle-job">USER</div>
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
                  defaultValue={this.state.nama}
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
                  defaultValue={this.state.alamat}
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
        </div>
      </div>
    );
  }
}

export default Tes;

// style={{ border: "1px solid red" }}
