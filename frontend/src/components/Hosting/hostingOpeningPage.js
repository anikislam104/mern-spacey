import React, { Component } from 'react';
import spacey from "../Authentication/spacey.svg";
import { Link } from 'react-router-dom';
import NavbarHomepage from '../navbar_homepage';

export default class HostingOpeningPage extends Component {
    render() {

        const myStyle= {
            logoSection:{
              width:"60px",
              height:"60px",
              
            },
            openingPicSection:{
                width:"275px",
                height:"275px",
                
            },
            picSection:{
              backgroundColor: "#4E4C87",
            },
            textSection:{
                color:"#E1E3EE",
            },
            nameSection:{
                color:"#0E2A53",
            },
          }

        return (
       
            <div className="maincontainer">
                <NavbarHomepage />
                <br />
             <div class="container-fluid">
                 <div class="row no-gutter">
                             
                     <div class="col-md-12 bg-light">
                         <div class="login d-flex align-items-center py-4" style={myStyle.picSection}>
                                    
                         </div>
                         <div class="login d-flex align-items-center py-5" style={myStyle.picSection}>
                            
                             <div class="container" >
                                 <div class="row align-items-center">
                                   
                                   <div class="col-lg-1">
   
                                   </div>
   
                                   
                                   
                              
                                   <div class="col-lg-6">
                                    <br/><br/><br/> 
                                         <h3 class="display-6"><b>What kind of place will you host <br/> with &nbsp; 
                                                  <img src={spacey} class="img-responsive" alt=" " style={myStyle.logoSection} /> 
                                         <font style={myStyle.nameSection}>&nbsp;Spacey</font></b> ? </h3>
                                         <br/>
                                         <Link to={{
                                            pathname:"/add-property",
                                            state:{option:'Personal Room'}
                                            }} className="navbar-brand" style={myStyle.optionSection} >Personal Room</Link>
                                         <br/>
                                         <Link to={{
                                            pathname:"/add-property",
                                            state:{option:'Business Storage'}
                                            }} className="navbar-brand" style={myStyle.optionSection} >Business Storage</Link>
                                         <br/>
                                     </div>
   
                                 </div>
                             </div>
                         </div>
                         <div class="login d-flex align-items-center py-4" style={myStyle.picSection}>
                                    
                        </div>
                     </div>
                 </div>
             </div>
           </div>
           
     )
    }
}