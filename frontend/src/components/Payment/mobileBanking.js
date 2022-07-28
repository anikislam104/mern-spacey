import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
import StripeCheckout from "react-stripe-checkout";

export default class MobileBanking extends Component {

    constructor(props) {
        super(props);

        this.onChangeAmount = this.onChangeAmount.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
        this.handleToken = this.handleToken.bind(this);

        this.state = {
            renter_id:'',
            amount: '',
            date: new Date(),
        }

    }

    componentDidMount() {
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    renter_id: json.user_id,
                });
                console.log('Checking....'+this.state.renter_id);
            })
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value,
        });
        //console.log(this.state.amount);
    }

    async handleToken (token){
        const payment={
            renter_id: this.state.renter_id,
            amount: this.state.amount,
            date: this.state.date,
        }

        console.log(payment);

        const response = await axios.post('http://localhost:5000/payments/add', {token,payment});
            
             //.then(res => console.log(res.data));
         const status = response.data;
         console.log("Response:", response.data);
         if (status === "success") {
            console.log(status);
             //window.location = '/payment/payment_success';
         } else {
            console.log(status);
             //window.location = '/payment/payment_failure';
         }
    }

    /*async onSubmit(e,token){
        e.preventDefault();

        const payment={
            renter_id: this.state.renter_id,
            amount: this.state.amount,
            date: this.state.date,
        }
        const response = await axios.all([
           axios.post('http://localhost:5000/payments/add', payment),
           axios.post('http://localhost:5000/payments/add', token),
        ])
           
            //.then(res => console.log(res.data));
        const status = response.data;
        console.log("Response:", response.data);
        if (status === "success") {
            window.location = '/payment/payment_success';
        } else {
            window.location = '/payment/payment_failure';
        }
        
    }*/

    render(){

        const myStyle= {
            buttonSection:{
             padding: "10px 15px",
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
     
                                     <div class="col-lg-7">
                                       {/*<form onSubmit={this.onSubmit} encType="multipart/form-data">
                                               <div class="form-group sm-3">
                                               <label><b>Amount: </b></label><br/><br/>
                                                   <input id="inputAmount" type="amount" placeholder=""  required="" autofocus="" value={this.state.amount} onChange={this.onChangeAmount} class="form-control border-0 shadow-sm px-4" />
                                                </div><br/>
                                                 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                            <StripeCheckout
                                                  stripeKey="pk_test_51LQUhSFrHNJyuz7GqC6uqAvVJyhosqYNb2xcaIPT15vxHCOVtmCOCOvPTchqEvZncK6wQtiRC4HKjpdqH5DErODg0095ObBGeV"
                                                  token={this.onSubmit.token} 
                                                  style={myStyle.buttonSection} 
                                            />
                                               <br/>
                                               <div>
                                               </div>
                                               <br/>
                                               <div className="form-group">
                                                <input type="submit" value="Confirm" className="btn btn-primary" style={myStyle.buttonSection} />
                                               </div>  

                                        </form>*/}
                                        <form encType="multipart/form-data">
                                               <div class="form-group sm-3">
                                               <label><b>Amount: </b></label><br/><br/>
                                                   <input id="inputAmount" type="amount" placeholder=""  required="" autofocus="" value={this.state.amount} onChange={this.onChangeAmount} class="form-control border-0 shadow-sm px-4" />
                                                </div><br/>
                                               <br/>
                                               <br/>
                                        </form>

                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                            <StripeCheckout
                                                  stripeKey="pk_test_51LQUhSFrHNJyuz7GqC6uqAvVJyhosqYNb2xcaIPT15vxHCOVtmCOCOvPTchqEvZncK6wQtiRC4HKjpdqH5DErODg0095ObBGeV"
                                                  token={this.handleToken} 
                                                  style={myStyle.buttonSection} 
                                            />

                                     </div>
                                     
                                     <div class="col-lg-2">
     
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