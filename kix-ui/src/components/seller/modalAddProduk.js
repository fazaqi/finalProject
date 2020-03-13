import React, { Component } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";

class ModalAddProduk extends Component {
  state = {
    // namaProduk: "",
    // harga: "",
    // kondisi: "",
    // deskripsi: "",
    gambar: null
  };

  getImage = e => {
    this.setState({ gambar: e.target.files });
  };

  onCancel = () => {
    this.setState({ gambar: null });
    this.props.onHide();
  };

  onSave = () => {
    let nama = this.refs.namaproduk.value;
    let harga = this.refs.harga.value;
    let kondisi = this.refs.kondisi.value;
    let deskripsi = this.refs.deskripsi.value;
    let gambar = this.state.gambar;

    let data = { nama, harga, kondisi, deskripsi, gambar };
    console.log(data);

    //AXIOS DISINI
  };

  render() {
    // console.log(this.state.gambar);
    return (
      <Modal {...this.props} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* FORM ADD PRODUK */}
          <Form>
            {/* NAMA PRODUK */}
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Nama Produk
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" ref="namaproduk" />
              </Col>
            </Form.Group>

            {/* HARGA */}
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Harga
              </Form.Label>
              <Col sm={10}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Rp</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="number" ref="harga" />
                </InputGroup>
              </Col>
            </Form.Group>

            {/* KONDISI PRODUK */}
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Kondisi Produk
              </Form.Label>
              <Col sm={10} className="mt-1">
                <Form.Control as="select" ref="kondisi">
                  <option value="Baru">Baru</option>
                  <option value="Bekas">Bekas</option>
                </Form.Control>
              </Col>
            </Form.Group>

            {/* DESKRIPSI PRODUK */}
            <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
              <Form.Label column sm={2}>
                Deskripsi Produk
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows="5"
                  ref="deskripsi"
                  placeholder="Deskripsikan Produk Anda Disini"
                />
              </Col>
            </Form.Group>

            {/* GAMBAR PRODUK */}
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Gambar Produk
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="file"
                  ref="gambar"
                  multiple={true}
                  onChange={this.getImage}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.onSave}>
            Tambah
          </Button>
          <Button variant="danger" onClick={this.onCancel}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalAddProduk;
