import React, { Component } from "react";

// Import Style
import Slider from "react-slick";
import { Container } from "react-bootstrap";

// Import Gambar
import banner1 from "../support/banner-carousel/1.png";
import banner2 from "../support/banner-carousel/2.png";
import banner3 from "../support/banner-carousel/3.png";
import banner4 from "../support/banner-carousel/4.png";
import banner5 from "../support/banner-carousel/5.png";

class Carousel extends Component {
  state = {
    banner: [banner1, banner2, banner3, banner4, banner5]
  };

  renderItem = () => {
    return this.state.banner.map((val, index) => {
      return (
        <div key={index}>
          <img
            src={val}
            style={{
              height: "300px",
              width: "600px",
              borderRadius: "8px",
              overflow: "hidden",
              margin: "20px"
            }}
            alt=""
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div className="homecarousel">
        <Slider
          className="center"
          dots={true}
          centerMode={true}
          infinite={true}
          centerPadding="1px"
          slidesToShow={3}
          speed={500}
          autoplay
          autoplaySpeed={5000}
          pauseOnHover={true}
        >
          {this.renderItem()}
        </Slider>
      </div>
    );
  }
}

export default Carousel;
