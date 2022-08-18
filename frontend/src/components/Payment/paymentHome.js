import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
import PaymentHome1 from "./paymentHome1.jpg";
import PaymentHome2 from "./paymentHome2.jpg";

export default class PaymentHome extends Component{
    constructor(props) {
        super(props);

        this.cashMethod=this.cashMethod.bind(this);
        this.mobileBankingMethod=this.mobileBankingMethod.bind(this);
        
    }


    cashMethod() {
        window.location.href = "/payment/cash_payment";
    }

    mobileBankingMethod() {
        window.location.href = "/payment/mobile_banking";
    }
    
    render() {
        const myStyle= {
            buttonSection:{
             padding: "10px 40px",
             fontSize: "20px",
             borderRadius: "10px",
             backgroundColor: "#395cf9",
             color: "white",
            },
            openingPicSection:{
                width:"320px",
                height:"200px",
                
            },
     
          }
        return(
            
            <div>
                <NavbarHomepage />
                <br/>
            <div class="container-fluid">

             <div class="row no-gutter">


            <div class="col-md-12 bg-light">
              <div class="login d-flex align-items-center py-5">

                <div class="container">
                  <div class="row align-items-center">

                    <div class="col-lg-2">

                    </div>

                    <div class="col-lg-8">
                      <div class="card-body">
                        <h3 class="display-6"><b>&emsp;Welcome to 
                          
                          <font style={myStyle.nameSection}>&nbsp;Spacey Payment Module!</font></b>
                          
                          </h3>
                          <br/>
                          <h5 class="card-subtitle text-muted">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                          <b>Easy & Secure payment system!!</b></h5>
                                            
                          
                      </div>


                    </div>

                    <div class="col-lg-2">

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <br/><br/>
    <div class="row no-gutter">
        <div class="col-lg-1">
                                
        </div>
        <div class="col-lg-5">
          <div class="image">
                <img src={PaymentHome1} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
          </div> <br/>
          <label><h5>&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;<b>Pay in person</b></h5></label><br/>
          <div className="container">
                <br/>
                &emsp;&emsp;
                <button onClick={this.cashMethod} style={myStyle.buttonSection}> Cash Method</button>
          </div>
        </div>

        <div class="col-lg-1">
                                
        </div>
        <div class="col-lg-5">
            <div class="image">
                    <img src={PaymentHome2} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
            </div> <br/>
              <label><h5>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<b>Pay with card </b></h5></label><br/>
              <div className="container">
                <br/>
                &emsp;&emsp;
                <button onClick={this.mobileBankingMethod} style={myStyle.buttonSection}>Mobile Banking</button>

             </div> 
        </div>             
    </div>

          </div>
            </div>
        )
    }

}