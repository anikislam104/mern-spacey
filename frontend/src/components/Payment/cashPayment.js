import axios from 'axios';
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
import Footer from '../Footer';
export default class CashPayment extends Component {
  constructor(props) {
    super(props);

    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        booking_id:'',
        renter_id:'',
        amount: '',
        date: new Date(),
        property_id:'',
        host_id:'',
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
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({
        renter_id: localStorage.getItem('user_id'),
        renter_email: userInfo.firstName,
        booking_id: localStorage.getItem('payment_booking_id'),
    });

    const data ={
        booking_id: localStorage.getItem('payment_booking_id'),
    }

    console.log(data);

    axios.post('http://localhost:5000/payments/host_property_id', data)
        .then(res => {
            this.setState({
                host_id: res.data.host_id,
                property_id: res.data.property_id,
                amount: res.data.amount,
            });
            console.log(this.state.host_id);
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
                                const id4={
                                    renter_id: localStorage.getItem('user_id'),
                                    amount: this.state.amount,
                                }
                                axios.post('http://localhost:5000/payments/get_renter_discount',id4)
                                    .then(res => 
                                        {
                                            console.log(res.data);
                                            this.setState({
                                                discount: res.data,
                                            });
                                        }); 


                            });
        });

    console.log(this.state.host_id);    

}

onChangeAmount(e) {
    this.setState({
        amount: e.target.value,
    });
    
}

async onSubmit (e){
  e.preventDefault();
    const payment={
        booking_id: this.state.booking_id,
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
        window.location = '/homepage';
        alert("Payment Successful");
     } else {
        console.log(res_status);
        window.location.reload();
        alert("Payment Failed");
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
                                          <h1 class="display-6">&emsp;&nbsp;<b>Cash Payment Method</b></h1>
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
                                     <h5> <b>Host:</b>&nbsp;{this.state.host_email}</h5><br/>
                                        <h5> <b>Property Title: </b>{this.state.property_title}</h5><br/>
                                        <h5> <b>Your Current Point:</b>&nbsp;{this.state.point}
                                             &emsp;&emsp;&emsp; <b>Discount:</b>&nbsp;{this.state.discount}</h5><br/>
                                        <h5> <b>Amount to pay:</b>&nbsp;{this.state.amount-this.state.discount}</h5><br/>
                                       <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                       <div class="form-group sm-3">
                                               
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
               <br/><br/><br/>
<Footer/>  
             </div>
             
       )
    }
}