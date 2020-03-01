import React, { Component } from "react";

//Component
import Navbar from "./../components/navbar";
import userimg from "../support/user.svg";

//Style
import { Form, Row, Col, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { FiHome } from "react-icons/fi";

//Utility
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import { APIURL } from "../helper/apiUrl";

class UserProfile extends Component {
  state = {
    nama: "",
    nomorhp: "",
    alamat: "",
    jeniskelamin: null
  };

  componentDidMount() {
    Axios.get(`${APIURL}manage/getuser/${this.props.id}`)
      .then(res => {
        let { nama, nomorhp, alamat, jeniskelamin } = res.data[0];
        this.setState({ nama, nomorhp, alamat, jeniskelamin });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

  btnSimpan = () => {
    let nama = this.refs.nama.value;
    let nomorhp = this.refs.hp.value;
    let alamat = this.refs.alamat.value;
    let jeniskelamin = "";

    if (this.refs.jkp.checked) {
      jeniskelamin = "Pria";
    } else if (this.refs.jkw.checked) {
      jeniskelamin = "Wanita";
    }

    let data = { nama, alamat, jeniskelamin, nomorhp };
    console.log(data);

    Axios.put(`${APIURL}manage/updateuser/${this.props.id}`, data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.props.login) {
      return (
        <div>
          <Navbar />

          <div className="container">
            <div className="row profile">
              <div className="col-md-3">
                <div className="profile-sidebar">
                  {/* SIDEBAR USERPIC */}
                  <div className="profile-userpic">
                    <img src={userimg} alt="" style={{ marginLeft: "4rem" }} />
                  </div>
                  {/* END SIDEBAR USERPIC */}
                  {/* SIDEBAR USER TITLE */}
                  <div className="profile-usertitle">
                    <div className="profile-usertitle-name">
                      {this.props.nama}
                    </div>
                    <div className="profile-usertitle-job">
                      {this.props.role === 3 ? "USER" : null}
                    </div>
                  </div>
                  {/* END SIDEBAR USER TITLE */}
                  {/* SIDEBAR BUTTONS */}

                  {/* END SIDEBAR BUTTONS */}
                  {/* SIDEBAR MENU */}
                  <div className="profile-usermenu">
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link href="/home">
                        <FiHome /> Active
                      </Nav.Link>
                      <hr className="style1" />
                      <Nav.Link eventKey="link-1">Link</Nav.Link>
                      <hr className="style1"></hr>
                      <Nav.Link eventKey="link-2">Link</Nav.Link>
                      <Nav.Link eventKey="disabled" disabled>
                        Disabled
                      </Nav.Link>
                    </Nav>
                  </div>
                  {/* END MENU */}
                </div>
              </div>

              {/* EDIT PROFIL */}
              <div className="col-md-9">
                <div className="profile-content">
                  <h2 className="kix mb-5">Profil</h2>
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
                    <fieldset>
                      <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                          Jenis Kelamin
                        </Form.Label>
                        <Col sm={10} className="mt-1">
                          <Form.Check
                            inline
                            label="Pria"
                            ref="jkp"
                            type="radio"
                            name="jeniskelamin"
                          />
                          <Form.Check
                            inline
                            label="Wanita"
                            ref="jkw"
                            type="radio"
                            name="jeniskelamin"
                          />
                        </Col>
                      </Form.Group>
                    </fieldset>

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
                    <Form.Group
                      as={Row}
                      controlId="exampleForm.ControlTextarea1"
                    >
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
                        <Button
                          type="button"
                          onClick={this.btnSimpan}
                          size="lg"
                        >
                          Simpan
                        </Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => {
  return {
    login: state.auth.login,
    email: state.auth.email,
    id: state.auth.id,
    nama: state.auth.nama,
    role: state.auth.roleId
  };
};

export default connect(mapStateToProps)(UserProfile);

//Bikin Alert Kalo Update Berhasl
//Defaultvalue jenis kelamin belom bisa
//Belum ada Proteksi jika ada yang kosong
