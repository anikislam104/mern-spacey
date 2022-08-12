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
        property_id:'62f5121a01422442835ac1be',
        host_id:'62d51ffeaa2f44071d1adf20',
        status: 'pending',
        update_date:'',
        host_email:'',
        renter_email:'',
        property_title:'',
        point:'',
        discount:'',
    }

}

componentDidMount() {
  fetch('http://localhost:5000/users/user_id')
      .then((res) => res.json())
      .then((json) => {
          this.setState({
              renter_id: localStorage.getItem('user_id'),
              renter_email:localStorage.getItem('email'),
          });
          //console.log('Checking....'+this.state.renter_id);
      })
      const id={
          host_id:this.state.host_id,
      }

      axios.post('http://localhost:5000/payments/get_host_email',id)
          .then(res => 
              {
                  console.log(res.data);
                  this.setState({
                      host_email: res.data,
                  });
              });
              const id2={
                  property_id:this.state.property_id,
              }
      
              axios.post('http://localhost:5000/payments/get_property_title',id2)
                  .then(res => 
                      {
                          console.log(res.data);
                          this.setState({
                              property_title: res.data,
                          });
                      }); 
                      const id3={
                        renter_id: localStorage.getItem('user_id'),
                      }
                      axios.post('http://localhost:5000/payments/get_renter_point',id3)
                        .then(res => 
                            {
                                console.log(res.data);
                                this.setState({
                                    point: res.data,
                                });
                            });

}

onChangeAmount(e) {
    this.setState({
        amount: e.target.value,
    });

    const id3={
        renter_id: localStorage.getItem('user_id'),
        amount: e.target.value,
    }
    axios.post('http://localhost:5000/payments/get_renter_discount',id3)
        .then(res => 
            {
                console.log(res.data);
                this.setState({
                    discount: res.data,
                });
            }); 
}

async onSubmit (e){
  e.preventDefault();
    const payment={
        renter_id: this.state.renter_id,
        amount: this.state.amount-this.state.discount,
        date: this.state.date,
        property_id: this.state.property_id,
        host_id: this.state.host_id,
        status: this.state.status,
        update_date: this.state.date,
        renter_email:this.state.renter_email,
        host_email:this.state.host_email,
        property_title:this.state.property_title,
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
                                     <h5> Property ID: {this.state.property_id}</h5><br/>
                                        <h5> Host ID: {this.state.host_id}</h5><br/>
                                        <h5> Host: {this.state.host_email}</h5><br/>
                                        <h5> Property Title: {this.state.property_title}</h5><br/>
                                        <h5> Your Current Point:{this.state.point}     &emsp;&emsp;&emsp; Discount: {this.state.discount} </h5><br/>
                                        <h5> Amount to pay:{this.state.amount-this.state.discount} </h5><br/>
                                       <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                       <div class="form-group sm-3">
                                               <label><b>Property Cost: </b></label><br/><br/>
                                                   <input id="inputAmount" type="amount" placeholder=""  required="" autofocus="" value={this.state.amount} onChange={this.onChangeAmount} class="form-control border-0 shadow-sm px-4" />
                                                </div><br/>
                                               <br/>
                                               <br/>
                                               <br/>
                                               <br/>
                                               <div className="form-group">
        
                                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                                    <input type="submit" value="Pay in Cash" className="btn btn-primary" style={myStyle.buttonSection} />
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