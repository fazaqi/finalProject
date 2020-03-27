import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import Axios from "axios";
import { APIURL } from "../helper/apiUrl";
import Loading from "../components/loading";
import Footer from "../components/footer";
import Numeral from "numeral";
import { AiTwotoneShop } from "react-icons/ai";
import { Link } from "react-router-dom";
import product from "../support/icon/inventory.svg";

class Shop extends Component {
  state = {
    produk: [],
    kategori: [],
    loading: false,
    loadprod: false
  };

  componentDidMount() {
    this.getProduk();
    this.getKategori();
  }

  getProduk = () => {
    this.setState({ loadprod: true });
    Axios.get(`${APIURL}shop/getproduk`)
      .then(res => {
        // console.log(res.data);
        this.setState({ produk: res.data });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loadprod: false });
      });
  };

  getKategori = () => {
    this.setState({ loading: true });
    Axios.get(`${APIURL}shop/getkategori`)
      .then(res => {
        this.setState({ kategori: res.data });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  getProdbyCat = id => {
    console.log(id);
    this.setState({ loadprod: true });

    Axios.get(`${APIURL}shop/getprodkat/${id}`)
      .then(res => {
        this.setState({ produk: res.data });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loadprod: false });
      });
  };

  renderKategori = () => {
    if (this.state.kategori.length) {
      return this.state.kategori.map((val, index) => {
        return (
          <div key={index}>
            <Button
              variant="secondary"
              style={{ width: "8rem" }}
              onClick={() => this.getProdbyCat(val.id)}
            >
              {val.kategori}
            </Button>
          </div>
        );
      });
    }
  };

  renderProduk = () => {
    // console.log(this.state.produk);
    if (this.state.loadprod) {
      return <Loading />;
    }

    if (this.state.produk.length === 0) {
      return (
        <div>
          <img src={product} alt="kosong" width={200} height={200} />
          <br />
          <br />
          <h5 style={{ color: "grey" }}>Produk Tidak Ada...</h5>
        </div>
      );
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
    if (this.state.loading) {
      return <Loading />;
    }
    console.log(this.state);
    return (
      <div>
        <div className="container">
          <h2
            className="text-center kix"
            style={{ marginTop: "10vh", fontSize: 40 }}
          >
            Belanja Sekarang
          </h2>
          <hr />
          <div className="d-flex justify-content-around">
            {this.renderKategori()}
          </div>
          <br />
          <div className="text-center">
            <Button
              variant="warning"
              style={{ width: "8rem" }}
              onClick={this.getProduk}
            >
              Reset
            </Button>
          </div>
          <div className="container d-flex productCard">
            {this.renderProduk()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Shop;
