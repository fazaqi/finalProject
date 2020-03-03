import React, { Component } from "react";
import Slider from "react-slick";
import banner1 from "../support/banner/patu-01.png";
import banner2 from "../support/banner/patu-02.png";
import banner3 from "../support/banner/patu-03.png";
class Carousel extends Component {
  state = {};
  render() {
    // const settings = {
    //   className: "center",
    //   centerMode: true,
    //   infinite: true,
    //   centerPadding: "60px",
    //   slidesToShow: 3,
    //   speed: 500
    // };
    return (
      <div>
        <Slider
          className="center"
          centerMode={true}
          infinite={true}
          centerPadding="60px"
          slidesToShow={3}
          speed={500}
          autoplay
          // {...settings}
        >
          <div>
            <img src={banner1} style={{ height: 150, width: 300 }} alt="" />
          </div>
          <div>
            <img src={banner2} style={{ height: 150, width: 300 }} alt="" />
          </div>
          <div>
            <img src={banner3} style={{ height: 150, width: 300 }} alt="" />
          </div>
          <div>
            <img src={banner1} style={{ height: 150, width: 300 }} alt="" />
          </div>
          <div>
            <img src={banner3} style={{ height: 150, width: 300 }} alt="" />
          </div>
          <div>
            <img src={banner2} style={{ height: 150, width: 300 }} alt="" />
          </div>
        </Slider>
      </div>
    );
  }
}

export default Carousel;
