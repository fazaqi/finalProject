import React, { Component } from "react";

import {
  Container,
  Card,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";

import Footer from "../components/footer";
import { connect } from "react-redux";

class Cart extends Component {
  state = {};

  render() {
    return (
      <div>
        <Container>
          <div className="mt-5">
            <h2 className="kix">Cart</h2>
            <hr />
            <div>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>Gambar</Col>
                    <Col>Detail Produk</Col>
                    <Col>
                      <div style={{ float: "right" }}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip>Hapus dari Keranjang</Tooltip>}
                        >
                          <Button variant="danger">
                            <FiTrash2 />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>Gambar</Col>
                    <Col>Detail Produk</Col>
                    <Col>Button Delete</Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    id: state.auth.id
  };
};

export default connect(MapstateToprops)(Cart);
