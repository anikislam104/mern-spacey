import axios from "axios";
import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
import Table from 'react-bootstrap/Table';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class PaymentHistory extends Component{

    constructor(props) {
        super(props);

        this.onChangeDate1=this.onChangeDate1.bind(this);
        this.onChangeDate2=this.onChangeDate2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user_id:'',
            payments1:[],
            date1:'',
            date2:'',
            total_income:'',
            income_between_days:'',
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
                    axios.post('http://localhost:5000/payments/get_payment_history',current_id),
                    axios.post('http://localhost:5000/payments/get_total_income',current_id),

                ])
                .then(axios.spread((res1, res2) => {
                    //console.log(res1.data);
                    this.setState({
                        payments1: res1.data,
                        total_income:res2.data,
                    });
                }));
                    
            });
    }

    getPaymentHistory(){
        const myStyle={
            textSection1:{
                textAlign:"right",
            },
            textSection2:{
                textAlign:"center",
            },
            
        }
        return this.state.payments1.map((payment) => {
            
                return(

                            <div>
                            <Table striped>
                            <tbody>
                                <tr>
                                <td style={myStyle.textSection2}>{payment.host_email}</td>
                                <td style={myStyle.textSection2}>&emsp;{payment.renter_email}</td>
                                <td style={myStyle.textSection2}>&emsp;&emsp;&emsp;{payment.property_title}</td>
                                <td style={myStyle.textSection1}>&emsp;{payment.amount}</td>
                                <td style={myStyle.textSection2}>{payment.date}</td>
                                </tr>
                                
                            
                            {/*<p className="card-text">Host id: {payment.host_id} Renter id: <b>{payment.renter_id}</b> Property id: <b>{payment.property_id}</b> Amount: <b>{payment.amount}</b> Date: {payment.update_date}</p>*/}
                            </tbody>
                            </Table>
                            </div>

                );
               
        });    
    }

    onChangeDate1(date) {
        this.setState({
            date1: date
        })
    }

    onChangeDate2(date) {
        this.setState({
            date2: date
        })
    }

    onSubmit(e){
        e.preventDefault();
        const obj={
            date1:this.state.date1,
            date2:this.state.date2,
            user_id:this.state.user_id,
        }
        axios.post('http://localhost:5000/payments/get_income_between_days',obj)
            .then(res => 
                {
                    console.log(res.data);
                    this.setState({
                        income_between_days: res.data,
                    });
                });
    }

    render(){
        const myStyle={
            textSection1:{
                textAlign:"right",
            },
            textSection2:{
                textAlign:"center",
            },
            borderSection:{
                borderColor:"blue",
            },
            
        }
        return(

            <div>
                <NavbarHomepage />
               <br/>
               <div>
               <Table>
                <thead>
                    <tr>
                    <th style={myStyle.textSection2}>Host</th>
                    <th style={myStyle.textSection2}>Renter</th>
                    <th style={myStyle.textSection2}>Property</th>
                    <th>Amount</th>
                    <th>Date</th>
                    </tr>
                </thead>
                </Table>
                </div>
              
                    {this.getPaymentHistory()}
                <p>
                    <br/>
                    <b>Your Total Income: {this.state.total_income} </b>
                </p>

                    <div class="col-md-12 bg-light">
            <div class="login d-flex align-items-start py-5">
               
                <div class="container">
                    <div class="row align-items-start">

                    <div class="col-lg-5">

                    </div>

                <div class="col-lg-7">
                    <br/>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">

                                <div class="input-group">
                     
                                    
                                    
                                        <DatePicker 
                                        selected={this.state.date1}
                                        onChange={this.onChangeDate1}
                                        showTimeSelect   
                                        showYearDropdown
                                        placeholderText={this.state.date1}
                                        style={myStyle.borderSection}
                                        placeholderText="Start date"/>
                                    
                                    <br/>
                                    <label>&nbsp;</label>
                                    
                                        <DatePicker 
                                        selected={this.state.date2}
                                        onChange={this.onChangeDate2}
                                        showTimeSelect   
                                        showYearDropdown
                                        placeholderText={this.state.date2}
                                        placeholderText="End date"
                                        />
  

                                </div>

                                <div className="form-group"><br/>
                                     &emsp;&emsp;&emsp;&emsp;
                                     <input type="submit" value="Check" className="btn btn-primary" />
                                </div>
                      
                         </form>
                    <p><b><br/>
                        Your Total Income between these dates: {this.state.income_between_days}
                        </b>
                    </p>
                </div>
                </div>
                </div>
                </div>
                </div>
            
            </div>
        )
    }

}