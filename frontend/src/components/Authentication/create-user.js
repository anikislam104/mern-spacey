import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

// import { useHistory } from 'react-router-dom'
// import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


export default class CreateUser extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeNIDNumber = this.onChangeNIDNumber.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          nidNumber: 0,
          phoneNumber: 0,
          dateOfBirth: new Date(),
          users: [],
          validity:'',
        }
      }

      onChangeFirstName(e) {
        this.setState({
          firstName: e.target.value
        })
      }

      onChangeLastName(e) {
        this.setState({
          lastName: e.target.value
        })
      }

        onChangeEmail(e) {
        this.setState({
            email: e.target.value
            })
        }

        onChangePassword(e) {
        this.setState({
            password: e.target.value
            })
        }

        onChangeNIDNumber(e) {
        this.setState({
            nidNumber: e.target.value
            })
        }

        onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
            })
        }

        onChangeDate(date) {
        this.setState({
            dateOfBirth: date
            })
        }


        async onSubmit(e) {
          e.preventDefault();
      
          const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            nidNumber: this.state.nidNumber,
            phoneNumber: this.state.phoneNumber,
            dateOfBirth: this.state.dateOfBirth
          }
      
          console.log(user);
      
          axios.post('http://localhost:5000/users/add', user)
            .then(res => {console.log(res.data);
              if(res.data === 'invalid'){
                window.location = '/invalidAuth';
              }
              else{
                window.location = '/signup_otp';
              }
            });
      
            
          
          
        }
    render() {

      const myStyle= {
        buttonSection:{
         padding: "10px 40px",
         fontSize: "20px",
         borderRadius: "10px",
         backgroundColor: "BlueViolet",
         color: "white",
        },
 
        inputSection:{
          padding : "10px 10px",
        }
 
      }

        return(
          
/*
          <div class="p-3 mb-2 bg-dark text-white">
          <h3>Create New Account</h3>
          <form onSubmit={this.onSubmit}>
          
            
            <div className="form-group" > 
              <label>First Name: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.firstName}
                  onChange={this.onChangeFirstName}
                  />
            </div>
            

            <div className="form-group"> 
              <label>Last Name: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.lastName}
                  onChange={this.onChangeLastName}
                  />
            </div>


            <div className="form-group"> 
              <label>Email: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  />
            </div>


            <div className="form-group"> 
              <label>Password: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  />
            </div>


            <div className="form-group"> 
              <label>NID Number: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.nidNumber}
                  onChange={this.onChangeNIDNumber}
                  />
            </div>

            <div className="form-group"> 
              <label>Phone Number: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={this.onChangePhoneNumber}
                  />
            </div>


            
            <div className="form-group">
            <label>Date Of Birth: </label>
            <div>
              <DatePicker
                selected={this.state.dateOfBirth}
                onChange={this.onChangeDate}
                showTimeSelect
                showYearDropdown
                placeholderText={this.state.dateOfBirth}
              />
            </div>
          </div>
            <br />
    
            <div className="form-group">
              <input type="submit" value="Sign Up" className="btn btn-primary" />
            </div>
          </form>
        </div>
*/
<div className="maincontainer">
<div class="container-fluid">
    <div class="row no-gutter">
       
        
        <div class="col-md-12 bg-light">
            <div class="login d-flex align-items-start py-5">
               
                <div class="container">
                    <div class="row align-items-start">
                      
                      <div class="col-lg-1">

                      </div>

                      <div class="col-lg-5">
                        <form onSubmit={this.onSubmit}>
                                <div class="form-group sm-2">
                                    <label>First Name: </label>
                                    <input id="inputFirstName" type="firstname" required="" autofocus="" value={this.state.firstName} onChange={this.onChangeFirstName} class="form-control rounded-pill border-0 shadow-sm px-4" />
                                </div>
                                <br/>
                                <div class="form-group sm-2">
                                    <label>Last Name: </label>
                                    <input id="inputLastName" type="lastname" required="" autofocus="" value={this.state.lastName} onChange={this.onChangeLastName} class="form-control rounded-pill border-0 shadow-sm px-4" />
                                </div>
                                <br/>
                                <div class="form-group sm-2">
                                    <label>Email: </label>
                                    <input id="inputEmail" type="email"  required="" autofocus="" value={this.state.email} onChange={this.onChangeEmail} class="form-control rounded-pill border-0 shadow-sm px-4" />
                                </div>
                                <br/>
                                <div class="form-group sm-2">
                                    <label>Password: </label>
                                    <input id="inputPassword" type="password" required="" value={this.state.password} onChange={this.onChangePassword} class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                </div>
                                <br/>
                                <div class="form-group sm-2">
                                    <label>NID Number: </label>
                                    <input id="inputNID" type="nid" required="" autofocus="" value={this.state.nidNumber} onChange={this.onChangeNIDNumber} class="form-control rounded-pill border-0 shadow-sm px-4" />
                                </div>
                                <br/>
                                <div class="form-group sm-2">
                                    <label>Phone Number: </label>
                                    <input id="inputPhone" type="phone"  required="" autofocus="" value={this.state.phoneNumber} onChange={this.onChangePhoneNumber} class="form-control rounded-pill border-0 shadow-sm px-4" />
                                </div>
                                <br/>
                                <div class="form-group sm-2">
                                    <label>Date Of Birth: </label>
                                    <div>
                                        <br/>
                                        <DatePicker class="form-control rounded-pill border-0 shadow-sm px-4"
                                        selected={this.state.dateOfBirth}
                                        onChange={this.onChangeDate}
                                        showTimeSelect   
                                        showYearDropdown
                                        placeholderText={this.state.dateOfBirth}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                     <input type="submit" value="Sign Up" className="btn btn-primary" style={myStyle.buttonSection} />
                                </div>
                      
                         </form>
                      </div>
                      
                      <div class="col-lg-1">

                      </div>

                      <div class="col-lg-5">
                            <br/><br/><br/><br/><br/>
                            <h3 class="display-4">Let's share & rent together!</h3>
                            <br/>
                            <p class="text-muted mb-4">Create your Spacey account!</p>
                            <br/>
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