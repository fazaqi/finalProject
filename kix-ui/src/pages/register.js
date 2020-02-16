import React, { Component } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Input,
  InputLabel,
  FormControl
} from "@material-ui/core";
// import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { APIURL } from "../helper/apiUrl";

class Register extends Component {
  state = {
    username: "",
    password: "",
    repassword: "",
    email: "",
    showPassword: false,
    showrePassword: false
  };

  onSubmit = () => {
    let { username, password, repassword, email } = this.state;
    if (
      username === "" ||
      password === "" ||
      repassword === "" ||
      email === ""
    ) {
      return console.log("gaboleh ada yg kosong");
    } else if (password !== repassword) {
      return console.log("password dan repass harus sama");
    } else if ((username, password, repassword, email)) {
      // let data = {username, password,email}
      Axios.post(`${APIURL}user/registuser`, { username, password, email })
        .then(res => {
          console.log(res);
        })
        .catch(err => {});
    }
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="container regisform">
        <div className="form-group">
          <h2 className="text-center mb-4">Register</h2>
          {/* <TextField
            className="form-control mb-5"
            label="Username"
            variant="outlined"
            onChange={e => this.setState({ username: e.target.value })}
          /> */}

          {/* Input Username */}
          <TextField
            // id="standard-basic"
            className="form-control mb-5"
            label="Username"
            onChange={e => this.setState({ username: e.target.value })}
          />

          {/* Input Password */}
          <FormControl className="form-control mb-5">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
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
              labelwidth={70}
            />
          </FormControl>

          {/* Reenter Password */}
          <FormControl className="form-control mb-5">
            <InputLabel htmlFor="standard-adornment-repassword">
              Re-enter Password
            </InputLabel>
            <Input
              id="standard-adornment-repassword"
              type={this.state.showrePassword ? "text" : "password"}
              value={this.state.repassword}
              onChange={e => this.setState({ repassword: e.target.value })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      this.setState({
                        showrePassword: !this.state.showrePassword
                      })
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
              labelwidth={70}
            />
          </FormControl>

          {/* Input Email */}
          <TextField
            // id="standard-basic"
            className="form-control mb-5"
            label="Email"
            onChange={e => this.setState({ email: e.target.value })}
            // error
          />

          {/* Button Register */}
          <Button
            className="mt-4 btnlogin"
            onClick={this.onSubmit}
            onMouseDown={this.handleMouseDownPassword}
            // disabled={this.state.username === "" ? true : false}
            size="lg"
          >
            Register
          </Button>
        </div>
      </div>
    );
  }
}

export default Register;
