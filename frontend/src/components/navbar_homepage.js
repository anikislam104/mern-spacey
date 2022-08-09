import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import spacey from "../components/Authentication/spacey.svg";

export default class NavbarHomepage extends Component {

  render() {
    const myStyle= {
      navSection:{
       backgroundColor: "#C2C6CC",
       color: "white",
       width:"1300px",
       height:"60px",
      },
      
      optionSection:{
        color: "#0E2A53",
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
         <div class="logo-image">
            <img src={spacey} class="img-responsive" alt=" " />
        </div>
        <Link to={"/homepage"} className="navbar-brand" style={myStyle.optionSection} ><h2>Spacey</h2></Link>
        <div class="col-lg-5">
   
        </div>
        <div class="col-lg-7">
         <div className="collpase navbar-collapse">
         <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            
          <Link to={'/rent_request_notifications'} className="nav-link"><h5>Rent Requests</h5></Link>
          </li>
          &nbsp; &nbsp; 
          <li className="navbar-item">
          <Link to={'/blog'} className="nav-link"><h5>Blog</h5></Link>
          </li>
          &nbsp; &nbsp; 
          <li className="navbar-item">
          <Link to={'/hosting'} className="nav-link rounded-pill" style={myStyle.textSection}><h6>Become A Host</h6></Link>
          </li>
          &nbsp; &nbsp;
          <li className="navbar-item">
          <Link to={'/renting'} className="nav-link rounded-pill" style={myStyle.textSection}><h6>Rent Storage</h6></Link>
          </li>
          &nbsp; &nbsp; 
          <li className="navbar-item">
          <Link to={'/logout'} className="nav-link"><h5>Log out</h5></Link>
          </li>
         </ul>
         </div>
        </div>
      </nav>
    )

  }
}