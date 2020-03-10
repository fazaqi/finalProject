import React, { Component } from "react";

//Component
import Navbar from "../components/navbar";
import userimg from "../support/user.svg";
import UserProfile from "../components/user/userProfile";
import SellerProfile from "../components/seller/sellerProfile";
import Footer from "../components/footer";

//Style
import { Tab, Badge } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

//Utility
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends Component {
  state = {
    // nama: "",
    // nomorhp: "",
    // alamat: ""
    // jeniskelamin: null
  };

  // componentDidMount() {
  //   const { id, role } = this.props;
  //   console.log(id, role);
  //   Axios.post(`${APIURL}manage/getuser`, { id, role })
  //     .then(res => {
  //       // if (role === 2) {
  //       //   let {}
  //       // }else if (role === 3) {
  //       //   let { nama, nomorhp, alamat, jeniskelamin } = res.data[0];
  //       //   let data = {nama,nomorhp,alamat, jeniskelamin}
  //       // }
  //       // console.log(res.data[0]);
  //       // this.setState({ nama, nomorhp, alamat, jeniskelamin });
  //       this.setState(res.data[0]);
  //       console.log(this.state);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // notify = () => toast.success("Data Berhasil Diubah.");

  // btnSimpan = () => {
  //   let nama = this.refs.nama.value;
  //   let nomorhp = this.refs.hp.value;
  //   let alamat = this.refs.alamat.value;
  //   let jeniskelamin = "";

  //   if (this.refs.jkp.checked) {
  //     jeniskelamin = "Pria";
  //   } else if (this.refs.jkw.checked) {
  //     jeniskelamin = "Wanita";
  //   }

  //   let data = { nama, alamat, jeniskelamin, nomorhp };
  //   console.log(data);

  //   Axios.put(`${APIURL}manage/updateuser/${this.props.id}`, data)
  //     .then(res => {
  //       console.log(res);
  //       this.notify();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  render() {
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
                          <Nav.Link eventKey="Wishlist">Wishlist</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="empat">Tab 4</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="lima">Tab 5</Nav.Link>
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
                    <Tab.Pane eventKey="dua">
                      <h1>Dua</h1>
                    </Tab.Pane>
                    <Tab.Pane eventKey="tiga">
                      <h1>Tiga</h1>
                    </Tab.Pane>
                    <Tab.Pane eventKey="empat">
                      <h1>Empat</h1>
                    </Tab.Pane>
                    <Tab.Pane eventKey="lima">
                      <h1>Lima</h1>
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
    role: state.auth.roleId
  };
};

export default connect(mapStateToProps)(Profile);

//Defaultvalue jenis kelamin belom bisa
//Belum ada Proteksi jika ada yang kosong
