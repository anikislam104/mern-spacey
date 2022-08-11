import axios from "axios";
import React, { Component } from 'react';
import NavbarHomepage from './navbar_homepage';

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
            payments2:[],
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
                axios.all([
                    axios.post('http://localhost:5000/payments/get_payment_notifications_as_host',current_id),
                    axios.post('http://localhost:5000/payments/get_payment_notifications_as_renter',current_id)
                ])
                .then(axios.spread((res1, res2) => {
                    console.log(res1.data);
                    this.setState({
                        payments1: res1.data,
                        payments2: res2.data,
                    });

                  }));
            })
    }

    approvePaymentRequest(payment_id){
        const id={
            payment_id:payment_id,
        }

        axios.post('http://localhost:5000/payments/approveRenterPayment',id)
            .then(res => 
                {
                    console.log(res.data);
                    window.location = '/payment/payment_approval';
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
                    window.location = '/payment/payment_reject';
                });
    }

    getMyNotificationsAsHost(){
        return this.state.payments1.map((payment) => {
            return(
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <div className="card-body">
                        <p className="card-text">Renter {payment.renter_id} is requested for the property {payment.property_id}</p>
                            {/* <p className="card-text">{property.location}</p> */}
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={
                                        () => {
                                            this.approvePaymentRequest(payment._id);
                                        }
                                    }>Approve</button>
                                    &emsp;&emsp;&emsp;

                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={
                                        () => {
                                            this.rejectPaymentRequest(payment._id);
                                        }
                                    }>Reject</button>

                                </div>
                                {/* <small className="text-muted">{property.size} square ft</small> */}
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    }

    getMyNotificationsAsRenter(){
        return this.state.payments2.map((payment) => {
            return(
                <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                        <div className="card-body">
                        <p className="card-text">Host {payment.host_id} has {payment.status} your request for the property {payment.property_id}</p>
                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {
        return(
            <div class="col-lg-12 bg-light">
                <NavbarHomepage />
                <br />
                {this.getMyNotificationsAsHost()}
                {this.getMyNotificationsAsRenter()}
            </div>
        )
    }

}