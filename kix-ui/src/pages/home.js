import React, { Component } from "react";

//Component
import Navbar from "../components/navbar";
import Carousel from "../components/homeCarousel";
import Banner from "../components/banner";
import Footer from "../components/footer";
import HomeCard from "../components/homeCard";

//Style
import { Jumbotron, Card } from "react-bootstrap";

//Image
import shoescard from "./../support/1.png";

class Homepage extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar />

        <Jumbotron
          fluid
          style={{
            backgroundColor: "transparent",
            height: "50vh"
          }}
        >
          <Carousel />
        </Jumbotron>

        <Banner />

        <HomeCard />

        <Jumbotron fluid className="foooter">
          <Footer />
        </Jumbotron>
      </div>
    );
  }
}

export default Homepage;
