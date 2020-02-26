import React, { Component } from "react";

//Import Style
import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import Button from "react-bootstrap/Button";
import HeadShake from "react-reveal/HeadShake";

//Import Tools
import { connect } from "react-redux";
import { userLoginAct, clearError } from "../redux/actions";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    showPassword: false,
    showError: false
  };

  componentDidMount() {
    if (this.props.Auth.error) {
      this.setState({ showError: true });
    }
    // {
    //   this.props.Auth.error ? this.setState({ showError: true }) : null;
    // }
  }

  componentDidUpdate() {
    console.log("masuk didupdate");
  }

  //Untuk Login
  onSubmit = () => {
    let username = this.state.username;
    let password = this.state.password;
    this.props.userLoginAct(username, password);

    // this.setState({ showError: true });

    // this.setState({ showError: true });
  };

  //Untuk menghilangkan border biru saat toggle password di klik
  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  // Untuk Login dengan tekan Enter
  keyPress = event => {
    if (event.key === "Enter") {
      this.onSubmit();
    }
  };

  clearErr = () => {
    this.props.clearError();
  };

  render() {
    if (this.props.userLog) {
      return <Redirect to={"/"} />;
    }
    return (
      <div className="container loginform">
        <div className="form-group">
          <h2 className="text-center mb-4">Masuk ke akun kamu</h2>
          {/* Input Username */}
          <TextField
            className="form-control mb-5"
            label="Username"
            variant="outlined"
            onChange={e =>
              this.setState({ username: e.target.value, inputuser: false })
            }
          />
          {/* Input Password */}
          <FormControl className="form-control mb-4" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={e =>
                this.setState({ password: e.target.value, inputpass: false })
              }
              onKeyPress={this.keyPress}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      this.setState({ showPassword: !this.state.showPassword })
                    }
                    onMouseDown={this.handleMouseDownPassword}
                    edge="end"
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          {/* Button Login */}
          <Button
            className="mt-4 btnlogin"
            onClick={this.onSubmit}
            onMouseDown={this.handleMouseDownPassword}
            disabled={this.state.username === "" ? true : false}
            size="lg"
          >
            Masuk
          </Button>
        </div>
        {this.props.Auth.error ? (
          <HeadShake>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    // this.setState({ showError: false });
                    this.clearErr();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              variant="filled"
              severity="error"
            >
              Username atau Password Salah
            </Alert>
          </HeadShake>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    userLog: state.userLogin.login,
    usernameLog: state.userLogin.username,
    Auth: state.userLogin
  };
};

export default connect(MapstateToprops, { userLoginAct, clearError })(Login);
