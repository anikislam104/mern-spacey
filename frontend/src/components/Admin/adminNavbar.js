import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import spacey from "../Authentication/spacey.svg";


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
        
        <Link to={"/adminHomepage"} className="navbar-brand" style={myStyle.optionSection} ><h2><b>Spacey</b></h2></Link>
        <div class="col-lg-5">
   
        </div>
        <div class="col-lg-7">
         <div className="collpase navbar-collapse">
         <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to={'/user_search'} className="nav-link"><h2><b>User Search</b></h2></Link>
          </li>

          <li className="navbar-item">
          <Link to={'/show_complaints'} className="nav-link"><h2><b>Show Complaints</b></h2></Link>
          </li>

          <li className="navbar-item">
          <Link to={'/payment_history_all'} className="nav-link"><h2><b>Payment Transactions</b></h2></Link>
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