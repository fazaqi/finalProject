import React, { Component } from "react";

// Import Style
import { Navbar, Nav, NavDropdown, Form, Button, Badge } from "react-bootstrap";

// Icons
import { FiShoppingCart } from "react-icons/fi";
import { MdSettings, MdExitToApp } from "react-icons/md";
import { FaRegUserCircle, FaDolly } from "react-icons/fa";
import { AiTwotoneShop } from "react-icons/ai";
import { FiBell } from "react-icons/fi";

//Redux
import { connect } from "react-redux";
import { logoutAct } from "../redux/actions";
import { Link } from "react-router-dom";

class Header extends Component {
  state = { catOpen: false, menuOpen: false };

  onLogout = () => {
    // localStorage.removeItem("kix");
    this.props.logoutAct();
  };

  handleDefault = event => {
    event.preventDefault();
  };

  handleOpen = () => {
    this.setState({ catOpen: true });
  };

  handleClose = () => {
    this.setState({ catOpen: false });
  };

  render() {
    let dropdownTitle = "";
    if (this.props.role === 3) {
      dropdownTitle = (
        <div style={{ display: "inline-block" }}>
          <FaRegUserCircle className="mr-2 mb-1" style={{ fontSize: "18" }} />
          {this.props.nama.nama ||
            this.props.nama.namatoko ||
            this.props.username}
        </div>
      );
    } else if (this.props.role === 2) {
      dropdownTitle = (
        <div style={{ display: "inline-block" }}>
          <AiTwotoneShop className="mr-2 mb-1" style={{ fontSize: "18" }} />
          {this.props.nama.nama ||
            this.props.nama.namatoko ||
            this.props.username}
        </div>
      );
    }
    return (
      <div>
        <Navbar bg="light" expand="lg">
          {/* <Container> */}
          <Navbar.Brand href="/" className="kix">
            K <span style={{ color: "#393e46" }}>I</span> X
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown
                title="Kategori"
                id="basic-nav-dropdown"
                className="mt-1 mr-3 ml-3"
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
            {this.props.role === 0 ? (
              // UNTUK MENU ADMIN
              <Nav className="ml-auto">
                <Nav.Link href="/login">Masuk</Nav.Link>
                <Nav.Link href="/register">Daftar</Nav.Link>
              </Nav>
            ) : this.props.role === 3 ? (
              // UNTUK MENU PEMBELI
              <Nav className="ml-auto">
                <Link to="/cart">
                  <Button variant="light" onMouseDown={this.handleDefault}>
                    <FiShoppingCart
                      style={{ fontSize: "20px" }}
                      className="d-inline-block"
                    />
                    <Badge
                      pill
                      variant="danger"
                      style={{ fontSize: "70%", verticalAlign: "top" }}
                    >
                      {this.props.cart}
                    </Badge>
                  </Button>
                </Link>

                <div className="leftBorderDiv"></div>

                <NavDropdown
                  alignRight
                  // title={
                  //   this.props.nama.nama ||
                  //   this.props.nama.namatoko ||
                  //   this.props.username
                  // }
                  title={dropdownTitle}
                  id="basic-nav-dropdown"
                  className="mt-"
                >
                  <NavDropdown.Item href="/cart">Pembelian</NavDropdown.Item>
                  <NavDropdown.Item href="/profile-user">
                    Pengaturan Profil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.onLogout}>
                    <MdExitToApp className="mr-2" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link href="/profile">Hi, {this.props.username}</Nav.Link> */}
              </Nav>
            ) : this.props.role === 2 ? (
              // UNTUK MENU PENJUAL
              <Nav className="ml-auto">
                <Button variant="light" onMouseDown={this.handleDefault}>
                  <FiBell
                    style={{ fontSize: "20px" }}
                    className="d-inline-block"
                  />
                  <Badge
                    pill
                    variant="danger"
                    style={{ fontSize: "70%", verticalAlign: "top" }}
                  >
                    0
                  </Badge>
                </Button>
                <div className="leftBorderDiv"></div>

                <NavDropdown
                  alignRight
                  // title={
                  //   this.props.nama.nama ||
                  //   this.props.nama.namatoko ||
                  //   this.props.username
                  // }
                  title={dropdownTitle}
                  id="basic-nav-dropdown"
                  className="mt-"
                >
                  <NavDropdown.Item href="/profile-seller">
                    <MdSettings className="mr-2" /> Profil Toko
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/manage-produk">
                    <FaDolly className="mr-2" /> Atur Produk
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.onLogout}>
                    <MdExitToApp className="mr-2" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              // MENU JIKA BELUM LOGIN
              <Nav className="ml-auto">
                <Nav.Link href="/login">Masuk</Nav.Link>
                <Nav.Link href="/register">Daftar</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
          {/* </Container> */}
        </Navbar>
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    username: state.auth.username,
    nama: state.auth,
    login: state.auth.login,
    role: state.auth.roleId,
    cart: state.cart.cart
  };
};

export default connect(MapstateToprops, { logoutAct })(Header);
