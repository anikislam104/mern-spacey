import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import spacey from "./spacey.svg";

export default class Navbar extends Component {

  render() {
    const myStyle= {
      navSection:{
       backgroundColor: "#C2C6CC",
       color: "white",
      },
      
      optionSection:{
        color: "#0E2A53",
       },

    }
    return (
      <nav className="navbar navbar navbar-expand-lg" style={myStyle.navSection}>
         <div class="logo-image">
            <img src={spacey} class="img-responsive" alt=" " />
        </div>
        <Link to={"/"} className="navbar-brand" style={myStyle.optionSection} >Spacey</Link>
        <div class="col-lg-9">
   
        </div>
        <div class="col-lg-3">
         <div className="collpase navbar-collapse">
         <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to={'/create-user'} className="nav-link">Sign Up</Link>
          </li>

          <li className="navbar-item">
          <Link to={'/login'} className="nav-link">Log In</Link>
          </li>
         </ul>
         </div>
        </div>
      </nav>
       
    )

  }
}