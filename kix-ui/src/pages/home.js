import React, { Component } from "react";

//Component
import Carousel from "../components/homeCarousel";
import Banner from "../components/banner";
import Footer from "../components/footer";
import HomeCard from "../components/homeCard";

//Style
import { Container } from "react-bootstrap";

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

        {/* FOOTER */}
        <Footer />
      </div>
    );
  }
}

export default Homepage;
