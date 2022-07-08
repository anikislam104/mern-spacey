import React, { Component } from 'react';
import spacey from "./spacey.svg";
import opening from "./opening.svg";

export default class OpeningPage extends Component {
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
   
                                   <div class="col-lg-5">
                                     <br/>
                                     <div class="logo-image">
                                         <img src={opening} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
                                     </div>
                                    
                                   </div>
                                   
                              
                                   <div class="col-lg-6">
                                    <br/><br/><br/> 
                                         <h3 class="display-6"><b>Let’s Find Your Desirebale <br/> Space with &nbsp;
                                                  <img src={spacey} class="img-responsive" alt=" " style={myStyle.logoSection} />
                                         <font style={myStyle.nameSection}>&nbsp;Spacey</font></b> </h3>
                                         <br/>
                                         <p style={myStyle.textSection}>Are you ready to visit or start over in a new area? <br/>Spacey will help you on your journey!</p>
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