import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
// import FileBase64 from 'react-file-base64';


export default class MobileBanking extends Component {
    constructor(props) {
        super(props);

        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            renter_id:'',
            amount: '',
        }
        
    }

    componentDidMount() {
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    renter_id: json.user_id,
                });
            })
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value,
        });
        console.log(this.state.amount);
    }


    onSubmit(e) {
        e.preventDefault();
        
        const payment={
            renter_id: this.state.renter_id,
            amount: this.state.amount,
        }

        axios.post('http://localhost:5000/payments/add', payment)
            .then(res => console.log(res.data));

        window.location = '/payment/payment_success';
    }

    render(){
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
     
                                     <div class="col-lg-7">

                                       <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                               <div class="form-group sm-3">
                                               <label>Amount: </label>
                                                   <input id="inputAmount" type="amount" placeholder=""  required="" autofocus="" value={this.state.amount} onChange={this.onChangeAmount} class="form-control border-0 shadow-sm px-4" />
                                               </div>
                                               <br/>
                                               
                                               <br/>
                                               <div className="form-group">
        
                                                    <input type="submit" value="Confirm" className="btn btn-primary" style={myStyle.buttonSection} />
                                               </div>
                                               

                                        </form>
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