import React, { Component } from "react";
import Navbar from "./../components/navbar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { FiHome } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
class UserProfile extends Component {
  state = {};
  render() {
    if (this.props.login) {
      return (
        <div>
          <Navbar />
          <h1>Profil</h1>
          <div className="container">
            <div className="row profile">
              <div className="col-md-3">
                <div className="profile-sidebar">
                  {/* SIDEBAR USERPIC */}
                  <div className="profile-userpic">
                    <img
                      src="http://keenthemes.com/preview/metronic/theme/assets/admin/pages/media/profile/profile_user.jpg"
                      className="img-responsive"
                      alt=""
                    />
                  </div>
                  {/* END SIDEBAR USERPIC */}
                  {/* SIDEBAR USER TITLE */}
                  <div className="profile-usertitle">
                    <div className="profile-usertitle-name">Marcus Doe</div>
                    <div className="profile-usertitle-job">Developer</div>
                  </div>
                  {/* END SIDEBAR USER TITLE */}
                  {/* SIDEBAR BUTTONS */}
                  <div className="profile-userbuttons">
                    <button type="button" className="btn btn-success btn-sm">
                      Follow
                    </button>
                    <button type="button" className="btn btn-danger btn-sm">
                      Message
                    </button>
                  </div>
                  {/* END SIDEBAR BUTTONS */}
                  {/* SIDEBAR MENU */}
                  <div className="profile-usermenu">
                    <Nav defaultActiveKey="/home" className="flex-column">
                      <Nav.Link href="/home">
                        <FiHome /> Active
                      </Nav.Link>
                      <hr className="style1" />
                      <Nav.Link eventKey="link-1">Link</Nav.Link>
                      <hr className="style1"></hr>
                      <Nav.Link eventKey="link-2">Link</Nav.Link>
                      <Nav.Link eventKey="disabled" disabled>
                        Disabled
                      </Nav.Link>
                    </Nav>
                    {/* <ul className="nav">
                      <li className="active">
                        <a href="#">
                          <FiHome /> Overview{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <AiOutlineUser /> Account Settings{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="glyphicon glyphicon-ok" />
                          Tasks{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="glyphicon glyphicon-flag" />
                          Help{" "}
                        </a>
                      </li>
                    </ul> */}
                  </div>
                  {/* END MENU */}
                </div>
              </div>
              <div className="col-md-9">
                <div className="profile-content">
                  Some user related content goes here...
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => {
  return {
    login: state.userLogin.login
  };
};

export default connect(mapStateToProps)(UserProfile);
