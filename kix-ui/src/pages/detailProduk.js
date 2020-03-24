import React, { Component } from "react";
import Axios from "axios";
import { APIURL } from "../helper/apiUrl";
import Footer from "../components/footer";
import Loading from "../components/loading";
import {
  Row,
  Col,
  Button,
  Container,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import Numeral from "numeral";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

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
                  <Col sm={4} style={{ color: "grey" }}>
                    Harga
                  </Col>
                  <Col style={{ color: "tomato", fontWeight: "bolder" }}>
                    {"Rp " + Numeral(produk.harga).format("0,0")}
                  </Col>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4} style={{ color: "grey" }}>
                    Jumlah Stok
                  </Col>
                  <Col>{produk.stok} pcs</Col>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4} style={{ color: "grey" }}>
                    Kategori Produk
                  </Col>
                  <Col>{produk.kategori}</Col>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4} style={{ color: "grey" }}>
                    Penjual
                  </Col>
                  <Link to={`/detail-toko/${produk.usersId}`} className="kix">
                    <Col>{produk.namatoko}</Col>
                  </Link>
                </Row>
              </div>
              <hr />
              <div>
                <Row>
                  <Col sm={4} style={{ color: "grey" }}>
                    Deskripsi
                  </Col>
                  <Col>{produk.deskripsi}</Col>
                </Row>
              </div>
              <hr />
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Tambah ke Wishlist</Tooltip>}
              >
                <Button variant="danger">
                  <FaRegHeart />
                </Button>
              </OverlayTrigger>
              <Button
                style={{
                  marginLeft: "10px"
                }}
                variant="success"
              >
                Tambah Ke Keranjang
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
