import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

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
              <NavDropdown
                title="Category"
                id="basic-nav-dropdown"
                className="mt-1 mr-5"
              >
                <NavDropdown.Item href="/">Action</NavDropdown.Item>
                <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                <NavDropdown.Item href="/">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
              </NavDropdown>
              <Form inline autoComplete="off">
                <input
                  type="text"
                  className="searchBar"
                  name="search"
                  placeholder="Search.."
                />
              </Form>
            </Nav>
            <Nav className="ml-auto">
              <IconButton style={{ outlineWidth: "0" }}>
                <ShoppingCartOutlinedIcon />
              </IconButton>
              <div className="leftBorderDiv"></div>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              {/* <Nav.Link href="/login">
                <Button size="medium">Login</Button>
              </Nav.Link>
              <Nav.Link href="/register">
                <Button size="medium">Register</Button>
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
