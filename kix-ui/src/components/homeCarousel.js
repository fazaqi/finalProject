import React, { Component } from "react";

// Import Style
import Carousel from "react-bootstrap/Carousel";

// Import Gambar
import banner1 from "../support/banner-carousel/1.jpg";
import banner2 from "../support/banner-carousel/2.jpg";
import banner3 from "../support/banner-carousel/3.jpg";
import banner4 from "../support/banner-carousel/4.jpg";

class HomeCarousel extends Component {
  state = {
    banner: [banner1, banner2, banner3, banner4]
  };

  renderItem = () => {
    return this.state.banner.map((val, index) => {
      return (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={val}
            alt="carouselimg"
            width={900}
            height={500}
          />
        </Carousel.Item>
      );
    });
  };

  render() {
    return (
      <div className="homecarousel">
        <Carousel>{this.renderItem()}</Carousel>
      </div>
    );
  }
}

export default HomeCarousel;
