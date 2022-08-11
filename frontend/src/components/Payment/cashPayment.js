import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';

export default class CashPayment extends Component {
  constructor(props) {
    super(props);

    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        renter_id:'',
        amount: '',
        date: new Date(),
        property_id:'62f4a5daf6c0bc0c3e81d218',
        host_id:'62f3d4aee9c3058362888a37',
        status: 'pending',
        update_date:'',
    }

}

componentDidMount() {
    fetch('http://localhost:5000/users/user_id')
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                renter_id: localStorage.getItem('user_id'),
            });
            console.log('Checking....'+this.state.renter_id);
        })
}

onChangeAmount(e) {
    this.setState({
        amount: e.target.value,
    });
}

async onSubmit (e){
  e.preventDefault();
    const payment={
        renter_id: this.state.renter_id,
        amount: this.state.amount,
        date: this.state.date,
        property_id: this.state.property_id,
        host_id: this.state.host_id,
        status: this.state.status,
        update_date: this.state.date,
    }

    console.log(payment);

    const response = await axios.post('http://localhost:5000/payments/add_in_cash', payment);

     const res_status=response.data;
     console.log("Response:", response.data);
     if (res_status === "success") {
        console.log(res_status);
        window.location = '/payment/payment_success';
     } else {
        console.log(res_status);
        window.location = '/payment/payment_failure';
     }
    }

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
                                     <h5> Property ID is: {this.state.property_id}</h5><br/>
                                        <h5> Host ID is: {this.state.host_id}</h5><br/>

                                       <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                       <div class="form-group sm-3">
                                               <label><b>Amount: </b></label><br/><br/>
                                                   <input id="inputAmount" type="amount" placeholder=""  required="" autofocus="" value={this.state.amount} onChange={this.onChangeAmount} class="form-control border-0 shadow-sm px-4" />
                                                </div><br/>
                                               <br/>
                                               <br/>
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