import React, { Component } from "react";

//Import Style
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HeadShake from "react-reveal/HeadShake";
import InputGroup from "react-bootstrap/InputGroup";
import { FaUserCircle, FaLock } from "react-icons/fa";

//Import Tools
import { connect } from "react-redux";
import { loginAct, clearError } from "../redux/actions";
import { Redirect } from "react-router-dom";
import Loading from "../components/loading";

class Login extends Component {
  state = {
    username: "",
    password: "",
    showPassword: false,
    showError: false
  };

  //Untuk Login
  onSubmit = () => {
    let username = this.state.username;
    let password = this.state.password;
    this.props.loginAct(username, password);
  };

  //Untuk menghilangkan border biru saat toggle password di klik
  handleDefault = event => {
    event.preventDefault();
  };

  // Untuk Login dengan tekan Enter
  keyPress = event => {
    if (event.key === "Enter") {
      this.onSubmit();
    }
  };

  clearAlert = () => {
    this.props.clearError();
  };

  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    if (this.props.login) {
      return <Redirect to={"/"} />;
    }
    return (
      <div className="container loginform">
        <div className="form-group">
          <h2 className="text-center mb-4">Masuk ke akun kamu</h2>

          <Form>
            {/* Input Username */}
            <Form.Group>
              <Form.Label>Username atau Email</Form.Label>
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
                  onKeyPress={this.keyPress}
                />
              </InputGroup>
            </Form.Group>
          </Form>
          {/* Button Login */}
          <div className="text-center mt-5">
            <Button
              className="btnlogin"
              onClick={this.onSubmit}
              onMouseDown={this.handleDefault}
              disabled={this.state.username === "" ? true : false}
              size="lg"
            >
              Masuk
            </Button>
          </div>
        </div>
        {/* Alert Jika Salah Username atau Password */}
        {this.props.error ? (
          <HeadShake>
            <Alert
              variant="danger"
              onClick={() => {
                this.clearAlert();
              }}
              dismissible
            >
              Username atau Password Salah
            </Alert>
          </HeadShake>
        ) : null}
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    login: state.auth.login,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(MapstateToprops, { loginAct, clearError })(Login);
