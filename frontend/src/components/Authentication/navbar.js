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
       height:"90px",
      },
      
      optionSection:{
        color: "#0E2A53",
        fontSize:"30px",
       },

       textSection:{
        backgroundColor:"#484848",
        color:"white",
        width:"150px",
        height:"40px",
        textAlign:"center",
       },

    }

    return (
      <nav className="navbar navbar navbar-expand-lg" style={myStyle.navSection}>
         
         &nbsp; &nbsp; &nbsp;<img src={spacey} class="img-responsive" alt=" " />
        
        <Link to={"/"} className="navbar-brand" style={myStyle.optionSection} ><h2><b> &nbsp;Spacey</b></h2></Link>
        <div class="col-lg-8">
   
        </div>
        <div class="col-lg-4">
         <div className="collpase navbar-collapse">
         <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to={'/create-user'} className="nav-link"><h2 style={{fontSize:"21px"}}><b>Sign Up&nbsp;&nbsp;</b></h2></Link>
          </li>

          <li className="navbar-item">
          <Link to={'/login'} className="nav-link"><h2 style={{fontSize:"21px"}}><b>Log In</b></h2></Link>
          </li>
         </ul>
         </div>
        </div>
      </nav>
       
    )

  }
}