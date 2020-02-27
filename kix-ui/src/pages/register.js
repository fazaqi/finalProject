import React, { Component } from "react";

//Style
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HeadShake from "react-reveal/HeadShake";
import InputGroup from "react-bootstrap/InputGroup";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

//Tools
import Axios from "axios";
import { APIURL } from "../helper/apiUrl";

class Register extends Component {
  state = {
    username: "",
    password: "",
    repassword: "",
    email: "",
    passerror: false,
    inputerror: false
  };

  onSubmit = () => {
    let { username, password, repassword, email } = this.state;
    if (
      username === "" ||
      password === "" ||
      repassword === "" ||
      email === ""
    ) {
      this.setState({ inputerror: true });
    } else if (password !== repassword) {
      this.setState({ passerror: true });
    } else if ((username, password, repassword, email)) {
      Axios.post(`${APIURL}user/registuser`, { username, password, email })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  clearAlert = param => {
    if (param === "input") {
      this.setState({ inputerror: false });
    } else if (param === "pass") {
      this.setState({ passerror: false });
    }
  };

  handleDefault = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="container regisform">
        <div className="form-group">
          <h2 className="text-center mb-4">Daftar Akun Baru</h2>
          <Form>
            {/* Input Username */}
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaUserCircle />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  onChange={e => this.setState({ username: e.target.value })}
                />
              </InputGroup>
            </Form.Group>
            {/* Input Password */}
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaLock />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </InputGroup>
            </Form.Group>
            {/* Input Reenter Password */}
            <Form.Group>
              <Form.Label>Re-Enter Password</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaLock />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="password"
                  onChange={e => this.setState({ repassword: e.target.value })}
                />
              </InputGroup>
            </Form.Group>
            {/* Input Email */}
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <MdEmail />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="email"
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </InputGroup>
            </Form.Group>
          </Form>

          {/* Button Register */}
          <Button
            className="mt-4 btnlogin"
            onClick={this.onSubmit}
            onMouseDown={this.handleDefault}
            size="lg"
          >
            Daftar
          </Button>
        </div>
        {/* Alert Error */}
        {this.state.inputerror ? (
          <HeadShake>
            <Alert
              variant="danger"
              onClick={() => {
                this.clearAlert("input");
              }}
              dismissible
            >
              Input tidak boleh ada yang kosong!
            </Alert>
          </HeadShake>
        ) : this.state.passerror ? (
          <HeadShake>
            <Alert
              variant="danger"
              onClick={() => {
                this.clearAlert("pass");
              }}
              dismissible
            >
              Password tidak match!
            </Alert>
          </HeadShake>
        ) : null}
      </div>
    );
  }
}

export default Register;

//Belom ada alert kalo berhasil
//Redirect ke login page setelah berhasil
