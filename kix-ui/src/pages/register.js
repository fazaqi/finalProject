import React, { Component } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Input,
  InputLabel,
  FormControl,
  Grid
} from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Button from "react-bootstrap/Button";

class Register extends Component {
  state = {
    username: "",
    password: "",
    email: "",
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
      <div className="container regisform">
        <div className="form-group">
          <h2 className="text-center mb-4">Register</h2>
          {/* <TextField
            className="form-control mb-5"
            label="Username"
            variant="outlined"
            onChange={e => this.setState({ username: e.target.value })}
          /> */}
          <TextField
            // id="standard-basic"
            className="form-control mb-5"
            label="Username"
            onChange={e => this.setState({ username: e.target.value })}
          />
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
              labelWidth={70}
            />
          </FormControl>
          <TextField
            // id="standard-basic"
            className="form-control mb-5"
            label="Email"
            error="true"
          />

          <Grid
            container
            spacing={1}
            alignItems="flex-end"
            style={{ width: "auto", border: "1px solid red" }}
          >
            <Grid item>
              <AlternateEmailIcon />
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="With a grid"
                style={{
                  minWidth: "100%",
                  maxWidth: "100%",
                  border: "1px solid red"
                }}
              />
            </Grid>
          </Grid>

          <Button
            className="mt-4 btnlogin"
            onClick={this.onSubmit}
            onMouseDown={this.handleMouseDownPassword}
            disabled={this.state.username === "" ? true : false}
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
