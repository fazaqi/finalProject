import React, { Component } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";

import Numeral from "numeral";

import { Link } from "react-router-dom";
import shopimg from "../../support/icon/shop.svg";
import Axios from "axios";
import { APIURL } from "../../helper/apiUrl";
import Loading from "../../components/loading";
import Footer from "../../components/footer";

class DetailToko extends Component {
  state = { datatoko: "", produk: "" };

  componentDidMount() {
    this.getDataToko();
    this.getProduk();
  }

  getDataToko = () => {
    const { id } = this.props.match.params;
    if (id) {
      Axios.get(`${APIURL}manage/getdetailtoko/${id}`)
        .then(res => {
          // console.log(res.data[0]);
          this.setState({ datatoko: res.data[0] });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  getProduk = () => {
    const { id } = this.props.match.params;
    if (id) {
      Axios.get(`${APIURL}manage/getproduk/${id}`)
        .then(res => {
          // console.log(res.data);
          this.setState({ produk: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  renderProduk = () => {
    // console.log(this.state.produk);
    if (this.state.produk.length === 0) {
      return <Loading />;
    } else {
      return this.state.produk.map((val, index) => {
        return (
          <Card
            className="carrd"
            style={{
              width: "18rem",
              marginLeft: "1rem",
              marginRight: "1rem"
            }}
            key={index}
          >
            <Link to={`/detail-produk/${val.id}`}>
              <Card.Img
                variant="top"
                src={`${APIURL + val.image}`}
                width={100}
                height={250}
                style={{ objectFit: "contain" }}
              />
            </Link>
            <Card.Body>
              <Link
                to={`/detail-produk/${val.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card.Title style={{ color: "black" }}>
                  {val.namaProduk}
                </Card.Title>
              </Link>
              <Card.Text style={{ color: "tomato", fontWeight: "bolder" }}>
                {"Rp " + Numeral(val.harga).format("0,0")}
              </Card.Text>
            </Card.Body>
            {/* <div>
              <Button
                variant="info"
                style={{
                  width: "12rem",
                  marginLeft: "1rem",
                  // marginRight: "1rem",
                  marginBottom: "1rem"
                }}
              >
                Tambah Ke Keranjang
              </Button>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Tambah ke Wishlist</Tooltip>}
              >
                <Button
                  variant="danger"
                  style={{
                    width: "3rem",
                    marginLeft: "7px",
                    marginRight: "auto",
                    marginBottom: "1rem"
                  }}
                >
                  <FaRegHeart />
                </Button>
              </OverlayTrigger>
            </div> */}
          </Card>
        );
      });
    }
  };

  render() {
    const { datatoko, produk } = this.state;
    if (datatoko === "") {
      return <Loading />;
    }
    console.log(datatoko, produk);
    return (
      <div>
        <Container>
          <div className="mt-5 mb-5">
            <Row>
              <Col sm={3}>
                <img
                  src={shopimg}
                  alt="tokoimg"
                  style={{ height: "150px", width: "150px" }}
                />
              </Col>
              <Col>
                <Row className="mb-3 kix">{datatoko.namatoko}</Row>
                <Row className="mb-3">{datatoko.alamattoko}</Row>
                <Row className="mb-3">{datatoko.nomorhp}</Row>
                <Row className="mb-3">{datatoko.deskripsitoko}</Row>
              </Col>
            </Row>
          </div>
          <hr />
          <div className="container mt-5">
            <h2 className="kix">Produk</h2>
            <div className=" d-flex productCard">{this.renderProduk()}</div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default DetailToko;
