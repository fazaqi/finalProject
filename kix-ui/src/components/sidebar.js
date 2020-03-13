import React, { Component } from "react";
import userimg from "../support/user.svg";

class Sidebar extends Component {
  state = {};
  render() {
    return (
      <div className="profile-sidebar">
        {/* SIDEBAR USERPIC */}
        <div className="profile-userpic">
          <img src={userimg} alt="" style={{ marginLeft: "4rem" }} />
        </div>
      </div>
    );
  }
}

export default Sidebar;
