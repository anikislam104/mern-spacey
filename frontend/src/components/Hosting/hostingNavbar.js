import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import spacey from "../Authentication/spacey.svg";

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
         <h3>Perosonal Room</h3>
        </div>
      </nav>
       
    )

  }
}