import React, { Component } from "react";
// import Navbar from "react-bootstrap/Navbar";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
  InputGroup
} from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";

class Header extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/" className="kix">
            K <span style={{ color: "#393e46" }}>I</span> X
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Category" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Action</NavDropdown.Item>
                <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                <NavDropdown.Item href="/">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              {/* <div className="input-group mr-sm-2">
                <input
                  className="form-control border-right-0"
                  placeholder="Search"
                ></input>
                <span className="input-group-append bg-white">
                  <button className="btn border border-left-0" type="button">
                    <i>
                      <SearchIcon />
                    </i>
                  </button>
                </span>
              </div> */}
              <InputGroup className="mr-sm-2">
                <FormControl aria-label="Amount (to the nearest dollar)" />
                <InputGroup.Append>
                  <Button variant="outline-secondary">
                    <SearchIcon />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              {/* <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              ></FormControl> */}
            </Form>
            <Nav className="ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/login">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
