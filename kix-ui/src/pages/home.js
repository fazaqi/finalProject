import React, { Component } from "react";
import Navbar from "../components/navbar";
import { Jumbotron, Container, Card } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import shoes from "./../support/shoes.png";
import shoescard from "./../support/1.png";

class Homepage extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar />
        <Jumbotron fluid>
          <Container>
            <h1>Fluid jumbotron</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
          </Container>
        </Jumbotron>
        <Fade bottom cascade>
          <div className="homebanner ">
            <Card
              className="bg-dark carrd text-white"
              style={{ width: "65vh" }}
            >
              <Card.Img
                src={shoes}
                alt="Card image"
                style={{ width: "100%", height: "270px" }}
              />
              <Card.ImgOverlay>
                <Card.Title>Banner 1</Card.Title>
                {/* <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text> */}
              </Card.ImgOverlay>
            </Card>
            <Card
              className="bg-dark carrd text-white"
              style={{ width: "65vh" }}
            >
              <Card.Img
                src={shoes}
                alt="Card image"
                style={{ width: "100%", height: "270px" }}
              />
              <Card.ImgOverlay>
                <Card.Title>Banner 2</Card.Title>
                {/* <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text> */}
              </Card.ImgOverlay>
            </Card>
            <Card
              className="bg-dark carrd text-white"
              style={{ width: "65vh" }}
            >
              <Card.Img
                src={shoes}
                alt="Card image"
                style={{ width: "100%", height: "270px" }}
              />
              <Card.ImgOverlay>
                <Card.Title>Banner 3</Card.Title>
                {/* <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text> */}
              </Card.ImgOverlay>
            </Card>
          </div>

          <div className="container d-flex productCard">
            <Card className="carrd" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={shoescard} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="carrd" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={shoescard} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="carrd" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={shoescard} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="carrd" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={shoescard} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="carrd" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={shoescard} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="carrd" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={shoescard} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Fade>
        <Jumbotron fluid className="foooter">
          <Container>
            <h1>Fluid jumbotron</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Homepage;
