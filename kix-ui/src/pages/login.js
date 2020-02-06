import React, { Component } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Button from "react-bootstrap/Button";

class Login extends Component {
  state = {
    username: "",
    password: "",
    showPassword: false
  };

  onSubmit = () => {
    console.log(this.state.username, this.state.password);
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="container loginform">
        <div className="form-group">
          <h2 className="text-center mb-4">Login</h2>
          <TextField
            className="form-control mb-5"
            label="Username"
            variant="outlined"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <FormControl className="form-control mb-4" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
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
              labelWidth={70}
            />
          </FormControl>
          <Button
            className="mt-4 btnlogin"
            onClick={this.onSubmit}
            onMouseDown={this.handleMouseDownPassword}
            disabled={this.state.username === "" ? true : false}
            size="lg"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
