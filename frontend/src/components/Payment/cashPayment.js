import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';

export default class CashPayment extends Component {
    render() {
        const myStyle= {
            buttonSection:{
             padding: "10px 40px",
             fontSize: "20px",
             borderRadius: "10px",
             backgroundColor: "BlueViolet",
             color: "white",
             position:"center",
            },
     
            inputSection:{
              padding : "10px 10px",
            },

            experienceSection:{
               width: "720px",
               height: "400px",
            },
     
          }
           return (
              
              <div className="maincontainer">
                <NavbarHomepage />
               <div class="container-fluid">
               <div class="row no-gutter">
                 
                  
                 <div class="col-md-12 bg-light">
                     <div class="login d-flex align-items-center py-5">
                        
                         <div class="container">
                             <div class="row align-items-center">
                               
                               <div class="col-lg-3">

                               </div>

                               <div class="col-lg-6">
                                     
                                     <div class="card-body">
                                          <h1>&emsp;&nbsp;Cash Payment Method</h1>
                                     </div>
                                   
                               </div>     

                               <div class="col-lg-3">
                               
                                 </div>

                             </div>
                         </div>
                     </div>
                 </div>
             </div>
                  
                   <div class="row no-gutter">
                      
                       
                       <div class="col-md-12 bg-light">
                           <div class="login d-flex align-items-center py-5">
                              
                               <div class="container">
                                   <div class="row align-items-center">
                                     
                                     <div class="col-lg-3">
     
                                     </div>
     
                                     <div class="col-lg-5">
                                     <b><label>Amount:</label></b> &emsp; $500
                                     <br/><br/><br/>
                                       <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                               <br/>
                                               <br/>
                                               <div className="form-group">
        
                                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                                    <input type="submit" value="Confirm" className="btn btn-primary" style={myStyle.buttonSection} />
                                               </div>
                                               

                                        </form>
                                     </div>
                                     
                                     <div class="col-lg-4">
     
                                     </div>
     
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
             </div>
             
       )
    }
}