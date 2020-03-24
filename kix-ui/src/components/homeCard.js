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
          <Link
            to={`/detail-produk/${val.id}`}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <Card
              className="carrd"
              style={{
                width: "18rem",
                marginLeft: "1rem",
                marginRight: "1rem"
              }}
            >
              <Card.Img
                variant="top"
                src={`${APIURL + val.image}`}
                width={100}
                height={250}
                style={{ objectFit: "contain" }}
              />

              <Card.Body>
                <Card.Title style={{ color: "black" }}>
                  {val.namaProduk}
                </Card.Title>

                <Card.Text style={{ color: "tomato", fontWeight: "bolder" }}>
                  {"Rp " + Numeral(val.harga).format("0,0")}
                </Card.Text>
                <Card.Text style={{ color: "grey", fontSize: 12 }}>
                  <AiTwotoneShop /> - {val.namatoko}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
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
