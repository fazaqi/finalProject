import React, { Component } from "react";
import banner1 from "../support/banner/casual.png";
import banner2 from "../support/banner/sneakers.png";
import banner3 from "../support/banner/formal.png";
import { Container, Card } from "react-bootstrap";

class Banner extends Component {
  state = {
    banner: [banner1, banner2, banner3]
  };

  renderItem = () => {
    return this.state.banner.map((val, index) => {
      return (
        <Card
          key={index}
          className="bg-dark carrd text-white"
          style={{ width: "35vh", border: "transparent" }}
        >
          <Card.Img
            src={val}
            alt="Card image"
            style={{ width: "100%", height: "100%" }}
          />
          <Card.ImgOverlay>
            {/* <Card.Title>Casual</Card.Title> */}
            {/* <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text> */}
          </Card.ImgOverlay>
        </Card>
      );
    });
  };

  render() {
    return (
      // <Container>
      <div className="homebanner ">{this.renderItem()}</div>
      // </Container>
    );
  }
}

export default Banner;
