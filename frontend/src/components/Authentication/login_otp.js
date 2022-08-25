import axios from 'axios';
import React, { Component } from 'react';
import Navbar from "./navbar"
export default class LogInOTP extends Component {
    
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
        console.log(localStorage.getItem('li_user_id'));
        const User = {
          user_id: localStorage.getItem('li_user_id'),
          email: localStorage.getItem('li_email'),
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
          
          // if(Number(this.state.otp) === Number(this.state.sent_otp))
          if(Number(this.state.otp) === Number(this.state.sent_otp)){
            console.log('OTP matched');
            localStorage.setItem('user_id', localStorage.getItem('li_user_id'));
            localStorage.setItem('email', localStorage.getItem('li_email'));
            localStorage.setItem('user_type', localStorage.getItem('li_user_type'));

            localStorage.removeItem('li_user_id');
            localStorage.removeItem('li_email');
            localStorage.removeItem('li_user_type');
            if(localStorage.getItem('user_type') === 'User'){
              window.location.href = '/homepage';
            }
            else{
              window.location.href = '/adminHomepage';
            }
          }
          else{
            console.log('OTP not matched');
            localStorage.removeItem('li_user_id');
            localStorage.removeItem('li_email');
            localStorage.removeItem('li_user_type');
            
            window.location = '/invalidAuth';
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
              <Navbar />
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