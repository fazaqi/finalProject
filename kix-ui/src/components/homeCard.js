import React, { Component } from "react";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Axios from "axios";
import { APIURL } from "../helper/apiUrl";
import Loading from "./loading";
import Numeral from "numeral";
import { AiTwotoneShop } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

import { Link } from "react-router-dom";

class HomeCard extends Component {
  state = {
    produk: []
  };

  componentDidMount() {
    Axios.get(`${APIURL}manage/getallprod`)
      .then(res => {
        console.log(res.data);
        this.setState({ produk: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

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
              <Link
                to={`/detail-toko/${val.usersId}`}
                style={{ textDecoration: "none" }}
              >
                <Card.Text style={{ color: "grey", fontSize: 12 }}>
                  <AiTwotoneShop /> - {val.namatoko}
                </Card.Text>
              </Link>
            </Card.Body>
            <div>
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
            </div>
          </Card>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <h2
          className="text-center kix"
          style={{ marginTop: "10vh", fontSize: 40 }}
        >
          Produk Terbaru
        </h2>
        <div className="container d-flex productCard">
          {this.renderProduk()}
        </div>
      </div>
    );
  }
}

export default HomeCard;
