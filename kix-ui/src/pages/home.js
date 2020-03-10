import React, { Component } from "react";

//Component
import Navbar from "../components/navbar";
import Carousel from "../components/homeCarousel";
import Banner from "../components/banner";
import Footer from "../components/footer";
import HomeCard from "../components/homeCard";

//Style
import { Jumbotron, Container } from "react-bootstrap";

class Homepage extends Component {
  state = {};
  render() {
    return (
      <div>
        {/* NAVBAR */}
        <Navbar />

        {/* CAROUSEL */}
        <Jumbotron
          fluid
          style={{
            backgroundColor: "transparent",
            height: "50vh",
            // border: "1px solid red",
            paddingTop: "1rem",
            paddingBottom: "1rem"
          }}
        >
          <Carousel />
        </Jumbotron>

        {/* BANNER */}
        <Banner />

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
