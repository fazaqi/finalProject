import React, { Component } from "react";

import { Card, Button } from "react-bootstrap";
import { FiPlusSquare } from "react-icons/fi";
import ModalAddProduk from "./modalAddProduk";

class ManageProduk extends Component {
  state = {
    modalAddProduk: false
  };

  render() {
    return (
      <div className="profile-content">
        <h2 className="kix mb-5">Atur Produk</h2>
        <Button
          className="btnaddproduk"
          onClick={() =>
            this.setState({ modalAddProduk: !this.state.modalAddProduk })
          }
        >
          <FiPlusSquare style={{ fontSize: "20" }} />
          {/* <br />
          <span style={{ fontSize: "10" }}>Tambah Produk</span> */}
        </Button>
        <div className="d-flex flex-wrap">
          {/* <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card> */}

          {/* MODAL ADD PRODUK */}
          <ModalAddProduk
            show={this.state.modalAddProduk}
            onHide={() =>
              this.setState({ modalAddProduk: !this.state.modalAddProduk })
            }
          />
        </div>
      </div>
    );
  }
}

export default ManageProduk;
