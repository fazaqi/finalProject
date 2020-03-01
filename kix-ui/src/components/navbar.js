import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Form } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { connect } from "react-redux";
import { logoutAct } from "../redux/actions";

class Header extends Component {
  state = {};

  onLogout = () => {
    localStorage.removeItem("kix");
    this.props.logoutAct();
  };

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
                <Nav.Link href="/login">Masuk</Nav.Link>
                <Nav.Link href="/register">Daftar</Nav.Link>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <FiShoppingCart />
                <div className="leftBorderDiv"></div>
                <NavDropdown
                  alignRight
                  title={this.props.nama || this.props.username}
                  id="basic-nav-dropdown"
                  className="mt-"
                >
                  <NavDropdown.Item href="/profile">Profil</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.onLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link href="/profile">Hi, {this.props.username}</Nav.Link> */}
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    username: state.auth.username,
    nama: state.auth.nama
  };
};

export default connect(MapstateToprops, { logoutAct })(Header);
