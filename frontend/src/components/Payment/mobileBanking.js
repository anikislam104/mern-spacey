import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';

export default class MobileBanking extends Component {
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
                                          <h1>Mobile Banking Payment Method</h1>
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
                                     <b><label>Mobile number:</label></b> &emsp; 01712345678
                                     <br/><br/><br/>
                                     <b><label>Amount:</label></b> &emsp; $500
                                     <br/><br/><br/>
                                       <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                               <div class="form-group sm-3">
                                               <b><label>Transaction ID: </label></b>
                                               <br/>
                                               <br/>
                                                   <p><input id="inputTitle" type="text" placeholder=""  required="" autofocus="" value="" onChange={this.onChangeTransactionID} class="form-control border-0 shadow-sm px-4" /></p>
                                               </div>
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