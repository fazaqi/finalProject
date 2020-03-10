import React, { Component } from "react";
import shoescard from "../support/1.png";
import { Card } from "react-bootstrap";

class HomeCard extends Component {
  state = {
    card: [
      {
        title: "card1",
        text:
          "Some quick example text to build on the card title and make upthe bulk of the cards content.",
        image: shoescard
      },
      {
        title: "card2",
        text:
          "Some quick example text to build on the card title and make upthe bulk of the cards content.",
        image: shoescard
      },
      {
        title: "card3",
        text:
          "Some quick example text to build on the card title and make upthe bulk of the cards content.",
        image: shoescard
      },
      {
        title: "card4",
        text:
          "Some quick example text to build on the card title and make upthe bulk of the cards content.",
        image: shoescard
      },
      {
        title: "card5",
        text:
          "Some quick example text to build on the card title and make upthe bulk of the cards content.",
        image: shoescard
      },
      {
        title: "card6",
        text:
          "Some quick example text to build on the card title and make upthe bulk of the cards content.",
        image: shoescard
      },
      {
        title: "card7",
        text:
          "Some quick example text to build on the card title and make upthe bulk of the cards content.",
        image: shoescard
      }
    ]
  };
  renderCard = () => {
    return this.state.card.map((val, index) => {
      return (
        <Card className="carrd" style={{ width: "18rem" }} key={index}>
          <Card.Img variant="top" src={val.image} />
          <Card.Body>
            <Card.Title>{val.title}</Card.Title>
            <Card.Text>{val.text}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };
  render() {
    return (
      <div className="container d-flex productCard">{this.renderCard()}</div>
    );
  }
}

export default HomeCard;
