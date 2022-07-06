import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
    
        
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          
          email: '',
          password: '',
          
        }
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

        async onSubmit(e) {
            e.preventDefault();

        
            const user = {
              
              email: this.state.email,
              password: this.state.password,
              
            }
        
            console.log(user);
        
            axios.post('http://localhost:5000/users/login', user)
              .then(res => {console.log(res.data);
                if(res.data === 'invalid'){
                  window.location = '/login';
                }
                else{
                  window.location = '/otp';
                }
              });
        
              }


    render(){
        return(
            <div class="p-3 mb-2 bg-dark text-white">
            <h3>Log Into Your Account</h3>
            <form onSubmit={this.onSubmit}>


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

            <br/>
            <div className="form-group">
              <input type="submit" value="Log In" className="btn btn-primary" />
            </div>

            </form>

            </div>

        )
    }
}