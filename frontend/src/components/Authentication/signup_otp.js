import axios from 'axios';
import React, { Component } from 'react';
import Navbar from './navbar';

export default class SignUpOTP extends Component {
    
    constructor(props) {
        super(props);
    
        
        this.onChangeOTP = this.onChangeOTP.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          
          otp: '',
          sent_otp: '',
          
          
        }
      }

      componentDidMount(){
        console.log(localStorage.getItem('su_user_id'));
        const User = {
          user_id: localStorage.getItem('su_user_id'),
          email: localStorage.getItem('su_email'),
        }
        axios.post('http://localhost:5000/users/getOTP', User)
          .then(res => {
            console.log(res.data);
            this.setState({
              sent_otp: res.data,
            })
          })
      }

      onChangeOTP(e) {
        this.setState({
            otp: e.target.value
            })
        }


        async onSubmit(e) {
            e.preventDefault();

        
            
        
            console.log(this.state.otp);
            console.log(this.state.sent_otp);
        
            if(Number(this.state.otp) === Number(this.state.sent_otp)){
              console.log('OTP matched');
              localStorage.removeItem('su_user_id');
              localStorage.removeItem('su_email');
              localStorage.removeItem('su_token');
              window.location = '/login';
            }
            else{
              console.log('OTP not matched');
              const User = {
                user_id: localStorage.getItem('su_user_id'),
                email: localStorage.getItem('su_email'),
              }
              axios.post('http://localhost:5000/users/deleteUser', User)
                .then(res => {
                  console.log(res.data);
                  window.location = '/invalidAuth';
                });
              // window.location = '/invalidAuth';
            }

              }


    render(){

        return(
          /*
            <div class="p-3 mb-2 bg-dark text-white">
            <h3>Enter your OTP:</h3>
            <form onSubmit={this.onSubmit}>


            <div className="form-group"> 
              <label>OTP: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeOTP}
                  />
            </div>



            <br/>
            <div className="form-group">
              <input type="submit" value="Done!" className="btn btn-primary" />
            </div>

            </form>

            </div>
           */

          
            <div className="maincontainer">
            <Navbar/>
            <br />
            <div class="container-fluid">
                <div class="row no-gutter">
                   
                    
                    <div class="col-md-12 bg-light">
                        <div class="login d-flex align-items-center py-5">
                            <div class="col-lg-4">

                            </div>
                            <div class="container">
                                <div class="row align-items-center col-lg-5">
                                <h3>Enter your OTP:</h3>
                                <form onSubmit={this.onSubmit}>


                            <div className="form-group"> 
                                <label>OTP: </label>
                                <input  type="text"
                                required
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeOTP}
                                />
                            </div>

                            <br/>
                            <div className="form-group">
                               <input type="submit" value="Done!" className="btn btn-primary" />
                            </div>

                            </form>
  
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