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

const initial_state = { a: 0, b: 0 };

class Tes extends Component {
  state = initial_state;

  render() {
    console.log(this.state);
    return (
      <div>
        <Container>
          <Tab.Container id="left-tabs-example" defaultActiveKey="satu">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="satu">Tab 1</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="dua">Tab 2</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tiga">Tab 3</Nav.Link>
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
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="satu">
                    <h1>Satu</h1>
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
              </Col>
            </Row>
          </Tab.Container>
        </Container>
        <button onClick={() => this.setState({ a: this.state.a + 1, c: 1 })}>
          asd
        </button>
        <button onClick={() => this.setState(initial_state)}>reset</button>
      </div>
    );
  }
}

export default Tes;
