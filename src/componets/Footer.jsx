import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoMarca.png";
import "../styles/footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <section className="logo">
        <Link to="/" className="link-logo">
          <img className="imagenLogo" src={logo} width="135" alt="Imagen"></img>
        </Link>
      </section>
      <div id="nav-footer">
        <nav>
          <section className="section" data-qa="footer-section-trending">
            <h6 className="titulos-section">Trending</h6>
            <ul>
              <li className="link">
                <Link to="/" data-qa="footer-section-trending-link-0">
                  Air Jordans
                </Link>
              </li>
              <li className="link">
                <Link to="/" data-qa="footer-section-trending-link-1">
                  Nike Dunks
                </Link>
              </li>
              <li className="link">
                <Link to="/" data-qa="footer-section-trending-link-2">
                  New Balance 990
                </Link>
              </li>
              <li className="link">
                <Link to="/" data-qa="footer-section-trending-link-3">
                  New Balance 327
                </Link>
              </li>
              <li className="link">
                <Link to="/" data-qa="footer-section-trending-link-4">
                  Air Max Day 2022
                </Link>
              </li>
              <li className="link">
                <Link to="/" data-qa="footer-section-trending-link-5">
                  Toddler sneakers
                </Link>
              </li>
            </ul>
          </section>
          <section className="section" data-qa="footer-section-new-releases">
            <h6 className="titulos-section">New Releases</h6>
            <ul>
              <li className="link">
                <a data-qa="footer-section-new-releases-link-0" href="#">
                  Yeezy 350 V2 'Oreo'
                </a>
              </li>
              <li className="link">
                <a data-qa="footer-section-new-releases-link-1" href="#">
                  Air Jordan 1 High 'Rebellionaire'
                </a>
              </li>
              <li className="link">
                <a data-qa="footer-section-new-releases-link-2" href="#">
                  Air Jordan 13 'Del Sol'
                </a>
              </li>
              <li className="link">
                <a data-qa="footer-section-new-releases-link-3" href="#">
                  Air Jordan 4 'Zen Master'
                </a>
              </li>
              <li className="link">
                <a data-qa="footer-section-new-releases-link-4" href="#">
                  Yeezy 350 V2 'Pure Oat'
                </a>
              </li>
              <li className="link">
                <a data-qa="footer-section-new-releases-link-5" href="#">
                  Yeezy 700 'Wave Runner'
                </a>
              </li>
            </ul>
          </section>
          <section className="section" data-qa="footer-section-about-us">
            <h6 className="titulos-section">About Us</h6>
            <ul>
              <li className="link">
                <a data-qa="footer-section-about-us-link-0" href="/">
                  Home
                </a>
              </li>
              <li className="link">
                <a data-qa="footer-section-about-us-link-1" href="/">
                  Store
                </a>
              </li>
              <li className="link">
                <a data-qa="footer-section-about-us-link-2" href="/carrito">
                  Cart
                </a>
              </li>
              <li className="link">
                <a
                  data-qa="footer-section-about-us-link-4"
                  href="https://www.instagram.com/"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li className="link">
                <a
                  data-qa="footer-section-about-us-link-5"
                  href="https://www.facebook.com/"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
              <li className="link">
                <a
                  data-qa="footer-section-about-us-link-6"
                  href="https://twitter.com/"
                  target="_blank"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </section>
        </nav>
      </div>
      <section className="copyright">
        <p className="copyright-texto">
          Â© 2022 Plataforma Sneakers New York LLC. All Rights Reserved
        </p>
      </section>
    </footer>
  );
};

export default Footer;
