import React, { Component } from "react";

//Style
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HeadShake from "react-reveal/HeadShake";
import InputGroup from "react-bootstrap/InputGroup";
import { FaUserCircle, FaLock, FaStore } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast, Slide } from "react-toastify";
import { Tab, Nav } from "react-bootstrap";

//Utility
import Axios from "axios";
import { APIURL } from "../helper/apiUrl";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const initial_state = {
  username: "",
  namatoko: "",
  password: "",
  repassword: "",
  email: "",
  passerror: false,
  inputerror: false,
  toLogin: false
};

class Register extends Component {
  state = initial_state;

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
          // console.log(res.data.status);
          this.notify(res.data.status);
          if (res.data.status === "Registrasi User Berhasil") {
            setTimeout(() => this.setState({ toLogin: true }), 2500);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  onSubmitToko = () => {
    let { username, password, repassword, email, namatoko } = this.state;
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
      Axios.post(`${APIURL}user/registtoko`, {
        username,
        password,
        email,
        namatoko
      })
        .then(res => {
          console.log(res.status);
          this.notify(res.data.status);
          if (res.data.status === "Registrasi Toko Berhasil") {
            setTimeout(() => this.setState({ toLogin: true }), 2500);
          }
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

  notify = message => {
    if (
      message === "Registrasi User Berhasil" ||
      message === "Registrasi Toko Berhasil"
    ) {
      toast.success(message);
    } else if (message === "Username Sudah Terdaftar") {
      toast.error(message);
    } else if (message === "Email Sudah Terdaftar") {
      toast.error(message);
    }
  };

  reset = () => this.setState(initial_state);

  render() {
    if (this.props.login) {
      return <Redirect to="/" />;
    } else if (this.state.toLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container regisform">
        <div className="form-group">
          <h2 className="text-center mb-4">Daftar Akun Baru</h2>

          <Tab.Container defaultActiveKey="pembeli">
            <Nav justify variant="tabs" className=" mb-3">
              <Nav.Item onClick={this.reset}>
                <Nav.Link eventKey="pembeli" className="registab">
                  Daftar Sebagai Pembeli
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={this.reset}>
                <Nav.Link eventKey="penjual" className="registab">
                  Daftar Sebagai Penjual
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              {/* ========= REGISTER PEMBELI ========= */}
              <Tab.Pane eventKey="pembeli">
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
                        value={this.state.username}
                        onChange={e =>
                          this.setState({ username: e.target.value })
                        }
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
                        value={this.state.password}
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
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
                        value={this.state.repassword}
                        onChange={e =>
                          this.setState({ repassword: e.target.value })
                        }
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
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>

                {/* Button Register */}
                <div className="text-center ">
                  <Button
                    className="mt-4 btnlogin"
                    onClick={this.onSubmit}
                    onMouseDown={this.handleDefault}
                    size="lg"
                  >
                    Daftar
                  </Button>
                </div>
              </Tab.Pane>
              {/* ========= REGISTER PENJUAL ========= */}
              <Tab.Pane eventKey="penjual">
                <Form>
                  {/* Input Nama Toko */}
                  <Form.Group>
                    <Form.Label>Nama Toko</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <FaStore />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        value={this.state.namatoko}
                        onChange={e =>
                          this.setState({ namatoko: e.target.value })
                        }
                      />
                    </InputGroup>
                  </Form.Group>
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
                        value={this.state.username}
                        onChange={e =>
                          this.setState({ username: e.target.value })
                        }
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
                        value={this.state.password}
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
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
                        value={this.state.repassword}
                        onChange={e =>
                          this.setState({ repassword: e.target.value })
                        }
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
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>

                {/* Button Register */}
                <div className="text-center ">
                  <Button
                    className="mt-4 btnlogin"
                    onClick={this.onSubmitToko}
                    onMouseDown={this.handleDefault}
                    size="lg"
                  >
                    Daftar
                  </Button>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
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
              Tidak boleh ada yang kosong!
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

        {/* SUCCESS TOAST */}
        {/* <ToastContainer
          position="bottom-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable={false}
          pauseOnHover={false}
        /> */}

        <ToastContainer
          transition={Slide}
          position="bottom-center"
          autoClose={2500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable={false}
          pauseOnHover={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.auth.login
  };
};

export default connect(mapStateToProps)(Register);
