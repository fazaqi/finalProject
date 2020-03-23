import React, { Component } from "react";
import Axios from "axios";
import { APIURL } from "../helper/apiUrl";
import Footer from "../components/footer";
import Loading from "../components/loading";
import { Row, Col, Button, Container } from "react-bootstrap";
import Numeral from "numeral";
import { FaRegHeart } from "react-icons/fa";

class DetailProduk extends Component {
  state = {
    produk: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      Axios.get(`${APIURL}manage/getdetailprod/${id}`)
        .then(res => {
          this.setState({ produk: res.data[0] });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    let { produk } = this.state;
    console.log(produk);
    if (produk.length === 0) {
      return <Loading />;
    }
    return (
      <div>
        <Container>
          <Row
            style={{
              marginTop: "7vh",
              marginBottom: "7vh"
            }}
          >
            <Col>
              <img
                src={`${APIURL + produk.image}`}
                alt="poster"
                style={{ height: "350px" }}
              />
            </Col>
            <Col>
              <div style={{ fontSize: 25, fontWeight: "bold" }}>
                {produk.namaProduk}
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4}>Harga</Col>
                  <Col style={{ color: "tomato", fontWeight: "bolder" }}>
                    {"Rp " + Numeral(produk.harga).format("0,0")}
                  </Col>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4}>Jumlah Stok</Col>
                  <Col>{produk.stok} pcs</Col>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4}>Kategori Produk</Col>
                  <Col>Masukin Kategori</Col>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4}>Penjual</Col>
                  <Col>{produk.namatoko}</Col>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4}>Deskripsi</Col>
                  <Col>{produk.deskripsi}</Col>
                </Row>
              </div>
              <hr />
              <Button variant="danger">
                <FaRegHeart />
              </Button>
              <Button
                style={{
                  marginLeft: "10px"
                }}
                variant="success"
              >
                Add to Cart
              </Button>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default DetailProduk;
