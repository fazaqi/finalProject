import React, { Component } from "react";

//Component
import Carousel from "../components/homeCarousel";
import Banner from "../components/banner";
import Footer from "../components/footer";
import HomeCard from "../components/homeCard";

//Style
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Homepage extends Component {
  state = {};

  render() {
    return (
      <div>
        {/* CAROUSEL */}

        <div>
          <Carousel />
        </div>

        {/* BANNER */}
        <div style={{ marginTop: "5vh" }}>
          <Banner />
        </div>

        {/* PRODUCTCARD */}
        <Container>
          <HomeCard />
        </Container>
        <div className="text-center mb-5">
          <Link to="/shop">
            <Button variant="outline-secondary">
              Tampilkan Produk Lainnya
            </Button>
          </Link>
        </div>
        {/* FOOTER */}
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

export default connect(MapstateToprops)(Homepage);
