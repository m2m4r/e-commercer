import React, { Component } from "react";
import "../styles/navbar.css";
import logo from "../assets/logoMarca.png";
import logoCarrito from "../assets/carrito.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Carrito from "./Carrito";
import { useSelector } from "react-redux";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((state) => state.user);

  const logout = () => {
    axios.post("/api/users/logout");
  };
  return (
    <nav
      className="navbar"
      id="Navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="field has-addons">
        <div className="control" id="Search">
          <input
            className="input"
            id="inputSearch"
            type="text"
            placeholder="Buscar"
          />
        </div>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">Sneakers</a>

          <div className="navbar-dropdown">
            <a className="navbar-item">Nike</a>
            <a className="navbar-item">Addidas</a>
            <a className="navbar-item">Topper</a>
            <a className="navbar-item">Otras marcas</a>
          </div>
        </div>
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">Ropa</a>
          <div className="navbar-dropdown">
            <a className="navbar-item">Nike</a>
            <a className="navbar-item">Addidas</a>
            <a className="navbar-item">Topper</a>
            <a className="navbar-item">Otras marcas</a>
          </div>
        </div>
        <div className="navbar-brand" id="logoMarca">
          <Link to="/" className="navbar-item" href="#" id="logo">
            <img
              className="imagenLogo"
              src={logo}
              width="135"
              alt="Imagen"
            ></img>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {user.id ? (
              <div className="buttons">
                <Link to="/" className="button is-primary" id="botonRegistro">
                  <strong>{user.nombre}</strong>
                </Link>
                <form>
                  <button
                    to="/logout"
                    className="button is-light"
                    id="botonLogin"
                    onClick={logout}
                  >
                    {" "}
                    Logout
                  </button>
                </form>
                <button
                  className="button is-primary"
                  id="botonCarrito"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <span className="icon">
                    <img src={logoCarrito} alt="logo" />
                  </span>
                </button>
                <div
                  className="offcanvas offcanvas-end"
                  tabindex="-1"
                  id="offcanvasRight"
                  aria-labelledby="offcanvasRightLabel"
                >
                  <div className="offcanvas-header">
                    <h2 id="offcanvasRightLabel" className="canvasTitle">
                      Tu carrito de compras.
                    </h2>
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    <Carrito />
                  </div>
                </div>
              </div>
            ) : (
              <div className="buttons">
                <Link
                  to="/register"
                  className="button is-primary"
                  id="botonRegistro"
                >
                  <strong>Sign up</strong>
                </Link>
                <Link to="/login" className="button is-light" id="botonLogin">
                  {" "}
                  Log in
                </Link>
                <button
                  className="button is-primary"
                  id="botonCarrito"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <span className="icon">
                    <img src={logoCarrito} alt="logo" />
                  </span>
                </button>
                <div
                  className="offcanvas offcanvas-end"
                  tabindex="-1"
                  id="offcanvasRight"
                  aria-labelledby="offcanvasRightLabel"
                >
                  <div className="offcanvas-header">
                    <h2 id="offcanvasRightLabel" className="canvasTitle">
                      Tu carrito de compras.
                    </h2>
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    <Carrito />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
