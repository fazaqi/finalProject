import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
// import Badge from "@material-ui/core/Badge";
import { connect } from "react-redux";

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
                title="Kategori"
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
                  placeholder="Cari di sini.."
                />
              </Form>
            </Nav>
            {this.props.username === "" ? (
              <Nav className="ml-auto">
                {/* <Badge badgeContent={4} color="error"> */}
                {/* <IconButton style={{ outlineWidth: "0" }}>
                  <ShoppingCartOutlinedIcon />
                </IconButton> */}
                {/* </Badge> */}
                {/* <div className="leftBorderDiv"></div> */}
                <Nav.Link href="/login">Masuk</Nav.Link>
                <Nav.Link href="/register">Daftar</Nav.Link>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                {/* <Badge badgeContent={4} color="error"> */}
                <IconButton style={{ outlineWidth: "0" }}>
                  <ShoppingCartOutlinedIcon />
                </IconButton>
                {/* </Badge> */}
                <div className="leftBorderDiv"></div>
                <Nav.Link href="/profile">Hi, {this.props.username}</Nav.Link>
              </Nav>
            )}
            {/* <Nav className="ml-auto">
              
              <IconButton style={{ outlineWidth: "0" }}>
                <ShoppingCartOutlinedIcon />
              </IconButton>
              
              <div className="leftBorderDiv"></div>
              <Nav.Link href="/login">Masuk</Nav.Link>
              <Nav.Link href="/register">Daftar</Nav.Link>
            </Nav> */}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    username: state.userLogin.username
  };
};

export default connect(MapstateToprops)(Header);
