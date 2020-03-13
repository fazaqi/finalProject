import React, { Component } from "react";
// import Tabs from "react-bootstrap/Tabs";
// import TabContainer from "react-bootstrap/TabContainer";
// import Tab from "react-bootstrap/Tab";
import {
  Row,
  Col,
  Nav,
  Tab,
  // Tabs,
  // TabContainer,
  Container
} from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../components/sidebar";
import ManageProduk from "../components/seller/manageProduk";

class Tes extends Component {
  state = {};

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div className="row profile">
          <div className="col-sm-3">
            <Sidebar />
          </div>
        </div>
        <div className="col-md-9">
          <ManageProduk />
        </div>
      </div>
    );
  }
}

export default Tes;
