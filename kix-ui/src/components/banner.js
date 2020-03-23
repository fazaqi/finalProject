import React, { Component } from "react";
import banner1 from "../support/banner/casual.png";
import banner2 from "../support/banner/sneakers.png";
import banner3 from "../support/banner/formal.png";
import { Card, Container, Row, Col } from "react-bootstrap";

class Banner extends Component {
  state = {
    banner: [banner1, banner2, banner3]
  };

  renderItem = () => {
    return this.state.banner.map((val, index) => {
      return (
        <Col key={index}>
          <Card
            className="bg-dark bannerimg text-white"
            style={{
              width: "400px",
              height: "320px",
              border: "transparent",
              overflow: "hidden",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <Card.Img
              src={val}
              alt="Card image"
              width={400}
              height={320}
              style={{ objectFit: "inherit" }}
              // className="bannerimg"
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
        </Col>
      );
    });
  };

  render() {
    return (
      // <div className="homebanner">{this.renderItem()}</div>;
      <Container fluid>
        <Row>{this.renderItem()}</Row>
      </Container>
    );
  }
}

export default Banner;
