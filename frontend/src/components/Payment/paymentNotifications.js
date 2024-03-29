import axios from "axios";
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
import Footer from '../Footer';

export default class Notifications extends Component{

    constructor(props) {
        super(props);

        this.approvePaymentRequest = this.approvePaymentRequest.bind(this);
        this.rejectPaymentRequest = this.rejectPaymentRequest.bind(this);


        //this.onChangeAmount = this.onChangeAmount.bind(this);
        //this.handleToken = this.handleToken.bind(this);

        this.state = {
            user_id:'',
            payments1:[],
        }
    
        
    }

    componentDidMount() {
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    user_id: localStorage.getItem('user_id'),
                });
                console.log('Checking....'+this.state.user_id);
                const current_id={
                    user_id: this.state.user_id,
                }

                axios.post('http://localhost:5000/payments/get_payment_notifications',current_id)
                    .then(res => {
                        console.log(res.data);
                        this.setState({
                            payments1: res.data,
                        });

                  });
                });
    }

    approvePaymentRequest(payment_id){
        const id={
            payment_id:payment_id,
        }

        axios.post('http://localhost:5000/payments/approveRenterPayment',id)
            .then(res => 
                {
                    console.log(res.data);
                    //window.location = '/payment/payment_approval';
                    window.location.reload();
                    alert("Payment Approved");
                });
    }

    rejectPaymentRequest(payment_id){
        const id={
            payment_id:payment_id,
        }

        axios.post('http://localhost:5000/payments/rejectRenterPayment',id)
            .then(res => 
                {
                    console.log(res.data);
                    //window.location = '/payment/payment_reject';
                    window.location.reload();
                    alert("Payment Rejected");
                });
    }

    getMyNotifications(){
        return this.state.payments1.map((payment) => {
            if (payment.host_id===this.state.user_id && payment.status==='pending'){
                return(
                    <div className="col-md-12">
                        <div className="card mb-4 box-shadow">
                            <div className="card-body">
                                
                            <p className="card-text" style={{textAlign:"center"}}><button class="btn btn-hover" style={{width:"1200px"}} >Renter {payment.renter_email} has <b>requested</b> for payment approval of amount <b>{payment.amount}</b> for the property <b>{payment.property_title}</b> at {payment.update_date}</button></p>
                                <br/>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" style={{backgroundColor:"#8b008b", color:"white"}} className="btn btn-sm" onClick={
                                            () => {
                                                this.approvePaymentRequest(payment._id);
                                            }
                                        }>Approve</button>
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                        <button type="button" style={{backgroundColor:"#8b008b", color:"white"}} className="btn btn-sm" onClick={
                                            () => {
                                                this.rejectPaymentRequest(payment._id);
                                            }
                                        }>Reject</button>
    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } 
            else if(payment.renter_id===this.state.user_id && payment.status==='pending'){
                return(
                    <div className="col-md-12">
                        <div className="card mb-4 box-shadow">
                            <div className="card-body">
                            <p className="card-text" style={{textAlign:"center"}}><button class="btn btn-hover" style={{width:"1200px"}} >Your payment request of amount <b>{payment.amount}</b> to Host {payment.host_email} for the property <b>{payment.property_title}</b> is <b>{payment.status}</b> at {payment.update_date}</button></p>
                            </div>
                        </div>
                    </div>
                );
            }
            else if(payment.renter_id===this.state.user_id){
                return(
                    <div className="col-md-12">
                        <div className="card mb-4 box-shadow">
                            <div className="card-body">
                            <p className="card-text" style={{textAlign:"center"}}><button class="btn btn-hover" style={{width:"1200px"}} >Host {payment.host_email} has <b>{payment.status}</b> your payment request of amount <b>{payment.amount}</b> for the property <b>{payment.property_title}</b> at {payment.update_date}</button></p>
                            </div>
                        </div>
                    </div>
                );
            }
            else{
                return(
                    <div>
                        
                    </div>
                );
            }
        })
    }
     
    render() {
        return(
            <div class="col-lg-12 bg-light">
                <NavbarHomepage />
                <br />
                {this.getMyNotifications()}
                <br/><br/><br/>
                <br/><br/><br/>
                <br/><br/><br/>
                <br/><br/><br/>
                <br/><br/><br/>
<Footer/> 
            </div>
        )
    }

}