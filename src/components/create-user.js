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
                window.location = '/user';
              }
              else{
                window.location = '/login';
              }
            });
      
            
          
          
        }
    render() {
        return(
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
        )
    }
}