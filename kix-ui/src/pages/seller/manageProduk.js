import React, { Component } from "react";

//Component
import Footer from "../../components/footer";
import NotFound from "../notfound";

//Style
import {
  Card,
  Button,
  Modal,
  Form,
  Row,
  Col,
  InputGroup
} from "react-bootstrap";
import { ToastContainer, toast, Slide } from "react-toastify";

//Icon
import { FiPlusSquare } from "react-icons/fi";

//Utility
import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Numeral from "numeral";

class ManageProduk extends Component {
  state = {
    produk: [],
    modalAddProduk: false,
    modalDelete: false,
    indexDel: null,
    modalEdit: false,
    indexEdit: null,
    gambar: null,
    listCategory: null,
    kategori: ""
  };

  componentDidMount() {
    this.getProduk();
    this.getAllKategori();
  }

  getAllKategori = () => {
    Axios.get(`${APIURL}manage/getkategori`)
      .then(res => {
        this.setState({ listCategory: res.data });
        // console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderKategori = () => {
    if (this.state.listCategory !== null) {
      return this.state.listCategory.map(val => {
        return (
          <option key={val.id} value={val.id}>
            {val.kategori}
          </option>
        );
      });
    }
  };

  getProduk = () => {
    if (this.props.id) {
      // this.setState({ loading: true });
      Axios.get(`${APIURL}manage/getproduk/${this.props.id}`)
        .then(res => {
          console.log(res.data);
          this.setState({ produk: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  //BUTTON EDIT PRODUK
  handleCatChange = e => {
    this.setState({ kategori: e.target.value });
  };

  onUbahClick = (index, id) => {
    this.setState({ modalEdit: true, indexEdit: index });
    console.log(id);
    Axios.get(`${APIURL}manage/getprodcat/${id}`)
      .then(res => {
        this.setState({ kategori: res.data[0].categoryId });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSimpanEdit = () => {
    let idproduk =
      this.state.indexEdit !== null
        ? this.state.produk[this.state.indexEdit].id
        : null;
    let nama = this.refs.namaproduk.value;
    let harga = this.refs.harga.value;
    let deskripsi = this.refs.deskripsi.value;
    // let gambar = this.state.gambar[0];
    let kategori = this.state.kategori;
    let stok = this.refs.stok.value;

    let data = {
      idproduk,
      nama,
      harga,
      deskripsi,
      usersId: this.props.id,
      kategori,
      stok
    };
    console.log(data);

    Axios.post(`${APIURL}manage/updateproduk`, data)
      .then(res => {
        if (res.data.message === "Update Berhasil") {
          this.setState({ modalEdit: false, kategori: "", indexEdit: null });
          this.getProduk();
          this.notify("edit");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  getImage = e => {
    this.setState({ gambar: e.target.files });
  };

  //BUTTON ADD PRODUK
  onCancel = () => {
    this.setState({ gambar: null, modalAddProduk: false, kategori: "" });
  };

  onTambah = () => {
    let formdata = new FormData();
    let Headers = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    let nama = this.refs.namaproduk.value;
    let harga = this.refs.harga.value;
    let deskripsi = this.refs.deskripsi.value;
    let gambar = this.state.gambar[0];
    let kategori = this.refs.kategori.value;
    let stok = this.refs.stok.value;

    let data = {
      nama,
      harga,
      deskripsi,
      usersId: this.props.id,
      kategori,
      stok
    };
    console.log(data);
    // console.log(gambar[0]);
    formdata.append("image", gambar);
    formdata.append("data", JSON.stringify(data));

    Axios.post(`${APIURL}manage/addproduk`, formdata, Headers)
      .then(res => {
        console.log(res);
        if (res.data.message === "Insert Produk Berhasil") {
          this.setState({ modalAddProduk: false, kategori: "" });
          this.getProduk();
          this.notify("add");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  //BUTTON DELETE PRODUK
  onDelete = id => {
    console.log(id, this.props.id);
    let data = {
      produkid: id,
      userid: this.props.id
    };
    Axios.post(`${APIURL}manage/deleteproduk`, data)
      .then(res => {
        // console.log(res);
        this.setState({ modalDelete: false, indexDel: null });
        this.getProduk();
        this.notify("delete");
      })
      .catch(err => {
        console.log(err);
      });
  };

  //ALERT
  notify = message => {
    if (message === "add") {
      toast.success("Produk Berhasil Ditambahkan");
    } else if (message === "edit") {
      toast.success("Produk Berhasil Diubah");
    } else if (message === "delete") {
      toast.success("Produk Berhasil Dihapus");
    }
  };

  //RENDER PRODUK
  renderProduk = () => {
    // console.log(this.state.produk);
    if (this.state.produk.length === 0) {
      return <h5>Produk Belum Ada...</h5>;
    } else {
      return this.state.produk.map((val, index) => {
        return (
          <Card
            style={{ width: "18rem", marginLeft: "1rem", marginRight: "1rem" }}
            key={index}
          >
            <Card.Img
              variant="top"
              src={`${APIURL + val.image}`}
              width={100}
              height={250}
              style={{ objectFit: "contain" }}
            />
            <Card.Body>
              <Card.Title>{val.namaProduk}</Card.Title>
              <Card.Text style={{ color: "tomato", fontWeight: "bolder" }}>
                {"Rp " + Numeral(val.harga).format("0,0")}
              </Card.Text>
              <Button
                variant="warning"
                style={{ width: "70px" }}
                onClick={() => this.onUbahClick(index, val.id)}
              >
                Ubah
              </Button>
              <Button
                variant="danger"
                style={{ float: "right", width: "70px" }}
                onClick={() =>
                  this.setState({ modalDelete: true, indexDel: index })
                }
              >
                Hapus
              </Button>
            </Card.Body>
          </Card>
        );
      });
    }
  };

  render() {
    if (this.props.login === false) {
      return <Redirect to="/" />;
    }
    if (this.props.role !== 2) {
      return <NotFound />;
    }
    // console.log(this.state.produk);

    return (
      <div>
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
          <div className="d-flex flex-wrap justify-content-center mt-5">
            {this.renderProduk()}
          </div>
          {/* MODAL ADD PRODUK */}
          <Modal
            show={this.state.modalAddProduk}
            onHide={() =>
              this.setState({
                modalAddProduk: !this.state.modalAddProduk,
                kategori: ""
              })
            }
            size="lg"
            centered
          >
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

                {/* KATEGORI PRODUK */}
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Kategori Produk
                  </Form.Label>
                  <Col sm={10} className="mt-1">
                    <Form.Control as="select" ref="kategori">
                      {this.renderKategori()}
                    </Form.Control>
                  </Col>
                </Form.Group>

                {/* STOK PRODUK */}
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Stok Produk
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="number" ref="stok" />
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
                      multiple={false}
                      onChange={this.getImage}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={this.onTambah}>
                Tambah
              </Button>
              <Button variant="danger" onClick={this.onCancel}>
                Batal
              </Button>
            </Modal.Footer>
          </Modal>

          {/* MODAL DELETE PRODUK */}
          <Modal
            show={this.state.modalDelete}
            onHide={() =>
              this.setState({
                modalDelete: !this.state.modalDelete,
                indexDel: null
              })
            }
            size="sm"
            centered
          >
            {this.state.indexDel === null ? null : (
              <div>
                <Modal.Body>
                  <p style={{ fontSize: "40" }}>
                    {`Anda Yakin Ingin Hapus ${
                      this.state.produk[this.state.indexDel].namaProduk
                    } ?`}
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="danger"
                    onClick={() =>
                      this.onDelete(this.state.produk[this.state.indexDel].id)
                    }
                  >
                    Hapus
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() =>
                      this.setState({
                        modalDelete: !this.state.modalDelete,
                        indexDel: null
                      })
                    }
                  >
                    Batal
                  </Button>
                </Modal.Footer>
              </div>
            )}
          </Modal>

          {/* MODAL EDIT PRODUK */}
          <Modal
            show={this.state.modalEdit}
            onHide={() =>
              this.setState({
                modalEdit: !this.state.modalEdit,
                kategori: "",
                indexEdit: null
              })
            }
            size="lg"
            centered
          >
            {this.state.indexEdit === null ? null : (
              <div>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {"Ubah Data Produk " +
                      this.state.produk[this.state.indexEdit].namaProduk}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* FORM EDIT PRODUK */}
                  <Form>
                    {/* NAMA PRODUK */}
                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        Nama Produk
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          ref="namaproduk"
                          defaultValue={
                            this.state.produk[this.state.indexEdit].namaProduk
                          }
                        />
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
                          <Form.Control
                            type="number"
                            ref="harga"
                            defaultValue={
                              this.state.produk[this.state.indexEdit].harga
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Form.Group>

                    {/* KATEGORI PRODUK */}
                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        Kategori Produk
                      </Form.Label>
                      <Col sm={10} className="mt-1">
                        <Form.Control
                          as="select"
                          ref="kategori"
                          value={this.state.kategori}
                          onChange={this.handleCatChange}
                        >
                          {this.renderKategori()}
                        </Form.Control>
                      </Col>
                    </Form.Group>

                    {/* STOK PRODUK */}
                    <Form.Group as={Row}>
                      <Form.Label column sm={2}>
                        Stok Produk
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="number"
                          ref="stok"
                          defaultValue={
                            this.state.produk[this.state.indexEdit].stok
                          }
                        />
                      </Col>
                    </Form.Group>

                    {/* DESKRIPSI PRODUK */}
                    <Form.Group
                      as={Row}
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label column sm={2}>
                        Deskripsi Produk
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          as="textarea"
                          rows="5"
                          ref="deskripsi"
                          defaultValue={
                            this.state.produk[this.state.indexEdit].deskripsi
                          }
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
                  <Button variant="success" onClick={this.onSimpanEdit}>
                    Simpan
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() =>
                      this.setState({
                        modalEdit: !this.state.modalEdit,
                        indexEdit: null,
                        kategori: ""
                      })
                    }
                  >
                    Batal
                  </Button>
                </Modal.Footer>
              </div>
            )}
          </Modal>

          {/* ALERT JIKA BERHASIL */}
          <ToastContainer
            transition={Slide}
            position="bottom-right"
            autoClose={2500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange={false}
            draggable={false}
            pauseOnHover={false}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

const MapstateToprops = state => {
  return {
    login: state.auth.login,
    role: state.auth.roleId,
    id: state.auth.id
  };
};

export default connect(MapstateToprops)(ManageProduk);

//Proteksi Jika Add ada yang kosong
//Edit Image Belom Bisa
