import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import spacey from "./spacey.svg";


export default class AdminNavbar extends Component {

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
         
            <img src={spacey} class="img-responsive" alt=" " />
        
        <Link to={"/"} className="navbar-brand" style={myStyle.optionSection} ><h2><b>Spacey</b></h2></Link>
        <div class="col-lg-8">
   
        </div>
        <div class="col-lg-4">
         <div className="collpase navbar-collapse">
         <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to={'/add_insurance'} className="nav-link"><h2><b>Add Insurance</b></h2></Link>
          </li>

          <li className="navbar-item">
          <Link to={'/show_insurance'} className="nav-link"><h2><b>Show Insurance</b></h2></Link>
          </li>
          <li className="navbar-item">
          <Link to={'/logout'} className="nav-link"><h2><b>Log Out</b></h2></Link>
          </li>
         </ul>
         </div>
        </div>

        
        
      </nav>

       
    )

  }
}