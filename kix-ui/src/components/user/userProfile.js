import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";
import { Form, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { getDataUser } from "../../redux/actions";

class UserProfile extends Component {
  state = {};

  componentDidMount() {
    const { id, role } = this.props;
    console.log(id, role);
    Axios.post(`${APIURL}manage/getuser`, { id, role })
      .then(res => {
        let { nama, nomorhp, alamat, jeniskelamin } = res.data[0];
        this.setState({ nama, nomorhp, alamat, jeniskelamin });
        // console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    Axios.get(`${APIURL}user/login/${this.props.id}`)
      .then(res => {
        if (res.data.length) {
          console.log(res.data[0]);
          this.props.getDataUser(res.data[0]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  notify = () => toast.success("Data Berhasil Diubah.");

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
    // console.log(data);

    Axios.put(`${APIURL}manage/updateuser/${this.props.id}`, data)
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
        <h2 className="kix ">Profil Saya</h2>
        <hr className="mt-3 mb-4" />
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
    nama: state.auth.nama,
    role: state.auth.roleId
  };
};

export default connect(mapStateToProps, { getDataUser })(UserProfile);
