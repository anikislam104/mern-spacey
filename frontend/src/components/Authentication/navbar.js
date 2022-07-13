import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import spacey from "./spacey.svg";

export default class Navbar extends Component {

  render() {
    const myStyle= {    
       navSection:{
        backgroundColor: "#C2C6CC",
        color: "white",
        width:"1285px",
        height:"60px",
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
        <Link to={"/"} className="navbar-brand" style={myStyle.optionSection} ><h2>Spacey</h2></Link>
        <div class="col-lg-8">
   
        </div>
        <div class="col-lg-4">
         <div className="collpase navbar-collapse">
         <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to={'/create-user'} className="nav-link"><h5>Sign Up</h5></Link>
          </li>

          <li className="navbar-item">
          <Link to={'/login'} className="nav-link"><h5>Log In</h5></Link>
          </li>
         </ul>
         </div>
        </div>
      </nav>
       
    )

  }
}