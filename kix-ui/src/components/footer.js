import React, { Component } from "react";

import { Container, Jumbotron } from "react-bootstrap";
//Import Icon
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { AiTwotoneShop } from "react-icons/ai";

class Footer extends Component {
  state = {};
  render() {
    return (
      <Jumbotron fluid className="foooter">
        <Container>
          <div className="row">
            <div className="col-lg-3">
              <div className="footer-left">
                <div className="footer-logo kix">
                  K <span style={{ color: "#393e46" }}>I</span> X
                  {/* <a href="/">
                    <AiTwotoneShop style={{ fontSize: 30, color: "#4ecca3" }} />
                  </a> */}
                </div>
                <ul>
                  <li>Address: Bekasi City</li>
                  <li>Phone: +65 11.188.888</li>
                  <li>Email: hello.colorlib@gmail.com</li>
                </ul>
                <div className="footer-social">
                  <a href="http://facebook.com">
                    <FaFacebookF />
                  </a>
                  <a href="http://instagram.com">
                    <FaInstagram />
                  </a>
                  <a href="http://twitter.com">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 offset-lg-1">
              <div className="footer-widget">
                <h5>Information</h5>
                <ul>
                  <li>
                    <a href="/">About Us</a>
                  </li>
                  <li>
                    <a href="/">Checkout</a>
                  </li>
                  <li>
                    <a href="/">Contact</a>
                  </li>
                  <li>
                    <a href="/">Serivius</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="footer-widget">
                <h5>My Account</h5>
                <ul>
                  <li>
                    <a href="/">My Account</a>
                  </li>
                  <li>
                    <a href="/">Contact</a>
                  </li>
                  <li>
                    <a href="/">Shopping Cart</a>
                  </li>
                  <li>
                    <a href="/">Shop</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="newslatter-item">
                <h5>Join Our Newsletter Now</h5>
                <p>
                  Get E-mail updates about our latest shop and special offers.
                </p>
                <form action="#" className="subscribe-form">
                  <input type="text" placeholder="Enter Your Mail" />
                  <button type="button">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Jumbotron>
    );
  }
}

export default Footer;
