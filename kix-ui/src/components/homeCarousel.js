import React, { Component } from "react";

// Import Style
import Slider from "react-slick";

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
        <div key={index} style={{ border: "1px solid red" }}>
          <img
            key={index}
            src={val}
            style={{
              height: "200px",
              width: "388px",
              padding: "10px",
              borderRadius: "20px"
              // border: "1px solid blue"
              // overflow: "hidden"
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
          className="center "
          dots={true}
          centerMode={true}
          infinite={true}
          centerPadding="0"
          slidesToShow={3}
          focusOnSelect={true}
          speed={800}
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
