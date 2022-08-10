import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Navbar from "./navbar"

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
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          nidNumber: '',
          phoneNumber: '',
          dateOfBirth: new Date(),
          users: [],
          user_type: '',
          image: null,
        }
      }

      onChangeUserType(e) {
        this.setState({
          user_type: e.target.value
        })
        console.log(e.target.value);
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
          console.log(e.target.value);
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
        
        onChangeImage(e) {
            console.log(e.target.files[0]);
            this.setState({
                image: e.target.files[0]
                })
            }

        async onSubmit(e) {
          e.preventDefault();
          
          // const user = {
          //   firstName: this.state.firstName,
          //   lastName: this.state.lastName,
          //   email: this.state.email,
          //   password: this.state.password,
          //   nidNumber: this.state.nidNumber,
          //   phoneNumber: this.state.phoneNumber,
          //   dateOfBirth: this.state.dateOfBirth,
          //   image: this.state.image
          // }

          const formData = new FormData();
          formData.append('firstName', this.state.firstName);
          formData.append('lastName', this.state.lastName);
          formData.append('email', this.state.email);
          formData.append('password', this.state.password);
          formData.append('user_type', this.state.user_type);
          formData.append('nidNumber', this.state.nidNumber);
          formData.append('phoneNumber', this.state.phoneNumber);
          formData.append('dateOfBirth', this.state.dateOfBirth);
          formData.append('image', this.state.image);
      
          // console.log(user);
      
          await axios.post('http://localhost:5000/users/jwtsignup', formData)
            .then(res => {console.log(res.data);
              if(res.data === 'invalid'){
                window.location = '/invalidAuth';
              }
              else{
                localStorage.setItem('su_token', res.data.token);
                localStorage.setItem('su_user_id', res.data.user_id);
                localStorage.setItem('su_email', res.data.email);
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

<div className="maincontainer">
<Navbar />
<br />
<div class="container-fluid">
    <div class="row no-gutter">
       
        
        <div class="col-md-12 bg-light">
            <div class="login d-flex align-items-start py-5">
               
                <div class="container">
                    <div class="row align-items-start">
                      
                      <div class="col-lg-1">

                      </div>

                      <div class="col-lg-5">
                        <form onSubmit={this.onSubmit} encType="multipart/form-data">
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
                                {/* //user type */}
                                <div class="form-group sm-2">
                                    <label>User type: </label>
                                    <select id="inputUserType" class="form-control rounded-pill border-0 shadow-sm px-4"  onChange={this.onChangeUserType} >
                                      <option value="">Select</option>
                                        <option value="Admin" >Admin</option>
                                        <option value="User" >User</option>
                                    </select>
                                </div>
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
                                <div class="form-group sm-3">
                                <label>Profile Picture: </label>
                                <br/><br/>
                                                  <div class="custom-file sm-3">
                                                    <input type="file" filename="image" class="custom-file-input form-control  border-0 shadow-sm px-4" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={this.onChangeImage} />
                                                  </div>
                                               </div>

                                <br/>
                                <br/>
                                <div className="form-group">
                                     &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                     <input type="submit" value="Sign Up" className="btn btn-primary" style={myStyle.buttonSection} />
                                </div>
                      
                         </form>
                      </div>
                      
                      <div class="col-lg-1">

                      </div>

                      <div class="col-lg-5">
                            <br/><br/><br/><br/><br/><br/>
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