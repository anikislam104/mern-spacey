import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import spacey from "../components/Authentication/spacey.svg";

export default class NavbarHomepage extends Component {

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
          <Link to={'/blog'} className="nav-link">Blog</Link>
          </li>

          <li className="navbar-item">
          <Link to={'/hosting'} className="nav-link">Hosting</Link>
          </li>
         </ul>
         </div>
        </div>
      </nav>
       
    )

  }
}