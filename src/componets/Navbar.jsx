import React, { Component } from 'react'
import "../styles/navbar.css";
import logo from "../assets/logoMarca.png"
import logoCarrito from "../assets/carrito.png"


export class Navbar extends Component {
  render() {
    return (  
<nav className="navbar" id='Navbar' role="navigation" aria-label="main navigation">
<div class="field has-addons">
  <div class="control" id='Search'>
    <input class="input" id='inputSearch' type="text" placeholder="Buscar"/>
  </div>
</div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            Sneakers
          </a>

          <div className="navbar-dropdown">
            <a className="navbar-item">
              Nike
            </a>
            <a className="navbar-item">
              Addidas
            </a>
            <a className="navbar-item">
              Topper
            </a>
            <a className="navbar-item">
              Otras marcas
            </a>
            
          </div>
      </div>
      <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            Ropa
          </a>
          <div className="navbar-dropdown">
            <a className="navbar-item">
              Nike
            </a>
            <a className="navbar-item">
              Addidas
            </a>
            <a className="navbar-item">
              Topper
            </a>
            <a className="navbar-item">
              Otras marcas
            </a> 
          </div>
      </div>
    <div className="navbar-brand" id='logoMarca'>
      <a className="navbar-item" href="#" id='logo'>
        <img className='imagenLogo' src={logo} width="135" alt="Imagen"></img>

      </a>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a className="button is-primary" id='botonRegistro'>
            <strong>Sign up</strong>
          </a>
          <a className="button is-light" id='botonLogin'>
            Log in
          </a>
          <button className="button is-primary" id='botonCarrito'>
            <span className="icon">
            <img src={logoCarrito} alt="logo" />
            </span>
          </button>
        </div>
      </div>
    </div>
    
  
  </div>
</nav>
      
    )
  }
}

export default Navbar;