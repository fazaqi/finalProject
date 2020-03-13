import React, { Component } from "react";

//Component
import Navbar from "../components/navbar";
import userimg from "../support/user.svg";
import UserProfile from "../components/user/userProfile";
import SellerProfile from "../components/seller/sellerProfile";
import ManageProduk from "../components/seller/manageProduk";
import Footer from "../components/footer";

//Style
import { Tab, Badge } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

//Utility
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getDataUser } from "../redux/actions";
import Axios from "axios";
import { APIURL } from "../helper/apiUrl";

class Profile extends Component {
  state = {};

  render() {
    // console.log("hal profil", this.props.location.state);
    // console.log(this.props.history);
    if (this.props.login) {
      return (
        <div>
          <Navbar />

          <div className="container">
            <Tab.Container id="left-tabs-example" defaultActiveKey="profil">
              <div className="row profile">
                <div className="col-md-3">
                  <div className="profile-sidebar">
                    {/* SIDEBAR USERPIC */}
                    <div className="profile-userpic">
                      <img
                        src={userimg}
                        alt=""
                        style={{ marginLeft: "4rem" }}
                      />
                    </div>
                    {/* END SIDEBAR USERPIC */}
                    {/* SIDEBAR USER TITLE */}
                    <div className="profile-usertitle">
                      <div className="profile-usertitle-name">
                        {this.props.nama.nama || this.props.nama.namatoko}
                      </div>
                      <div className="profile-usertitle-job">
                        {this.props.role === 3
                          ? "USER"
                          : this.props.role === 2
                          ? "SELLER"
                          : null}
                      </div>
                    </div>
                    {/* END SIDEBAR USER TITLE */}

                    {/* SIDEBAR MENU */}
                    <div className="profile-usermenu">
                      {/* TAB MENU */}
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="profil">Profil</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="pesanan">
                            Pesanan{" "}
                            <Badge
                              style={{ float: "right" }}
                              pill
                              variant="primary"
                            >
                              1
                            </Badge>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="wishlist">Wishlist</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="produk">Produk</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="pass">Ganti Password</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="enam">Tab 6</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                    {/* END MENU */}
                  </div>
                </div>

                {/* EDIT PROFIL */}
                <div className="col-md-9">
                  <Tab.Content>
                    <Tab.Pane eventKey="profil">
                      {/* USER PROFILE / SELLER PROFILE */}
                      {this.props.role === 3 ? (
                        <UserProfile />
                      ) : this.props.role === 2 ? (
                        <SellerProfile />
                      ) : null}
                      {/* <UserProfile /> */}
                    </Tab.Pane>
                    <Tab.Pane eventKey="pesanan">
                      <h1>Pesanan</h1>
                    </Tab.Pane>
                    <Tab.Pane eventKey="wishlist">
                      <h1>Wishlist</h1>
                    </Tab.Pane>
                    <Tab.Pane eventKey="produk">
                      <ManageProduk />
                    </Tab.Pane>
                    <Tab.Pane eventKey="pass">
                      <h1>Ganti Password</h1>
                    </Tab.Pane>
                    <Tab.Pane eventKey="enam">
                      <h1>Enam</h1>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </div>
            </Tab.Container>
          </div>
          <Footer />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => {
  return {
    login: state.auth.login,
    nama: state.auth,
    role: state.auth.roleId,
    id: state.auth.id
  };
};

export default connect(mapStateToProps, { getDataUser })(Profile);

//Belum ada Proteksi jika ada yang kosong
