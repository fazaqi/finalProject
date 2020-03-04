import React, { Component } from "react";
import Slider from "react-slick";
import banner1 from "../support/banner-carousel/1.png";
import banner2 from "../support/banner-carousel/2.png";
import banner3 from "../support/banner-carousel/3.png";
import banner4 from "../support/banner-carousel/4.png";
import banner5 from "../support/banner-carousel/5.png";
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
          dots={true}
          centerMode={true}
          infinite={true}
          centerPadding="60px"
          slidesToShow={3}
          speed={500}
          autoplay
          autoplaySpeed={5000}
          pauseOnHover={true}
          // {...settings}
        >
          <div>
            <img
              src={banner1}
              style={{
                height: "20vh",
                width: "32vh",
                borderRadius: "8px",
                overflow: "hidden"
              }}
              alt=""
            />
          </div>
          <div>
            <img
              src={banner2}
              style={{
                height: "20vh",
                width: "32vh",
                borderRadius: "8px",
                overflow: "hidden"
              }}
              alt=""
            />
          </div>
          <div>
            <img
              src={banner3}
              style={{
                height: "20vh",
                width: "32vh",
                borderRadius: "8px",
                overflow: "hidden"
              }}
              alt=""
            />
          </div>
          <div>
            <img
              src={banner4}
              style={{
                height: "20vh",
                width: "32vh",
                borderRadius: "8px",
                overflow: "hidden"
              }}
              alt=""
            />
          </div>
          <div>
            <img
              src={banner5}
              style={{
                height: "20vh",
                width: "32vh",
                borderRadius: "8px",
                overflow: "hidden"
              }}
              alt=""
            />
          </div>
        </Slider>
      </div>
    );
  }
}

export default Carousel;
