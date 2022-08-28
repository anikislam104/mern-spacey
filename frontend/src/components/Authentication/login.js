import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "./navbar"

export default class Login extends Component {
    constructor(props) {
        super(props);
    
        
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          
          email: '',
          password: '',
          user_type: '',
          
        }
      }
      onChangeUserType(e) {
        this.setState({
            user_type: e.target.value
            })
            console.log(e.target.value);
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
              user_type: this.state.user_type,
              
            }
        
            console.log(user);
        
            axios.post('http://localhost:5000/users/jwtlogin', user)
              .then(res => {console.log(res.data);
                if(res.data === 'invalid'){
                  window.location = '/invalidAuth';
                }
                else{
                  localStorage.setItem("userInfo", JSON.stringify(res.data));
                  localStorage.setItem('li_user_id', res.data.user_id);
                  localStorage.setItem('li_email', res.data.email);
                  localStorage.setItem('li_user_type', res.data.user_type);
                  window.location = '/login_otp';
                }
              });
        
              }

/*
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
  */  

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
      return (
        
         <div className="bg-light">
          <Navbar />
          
          <div class="container-fluid">
              <div class="row no-gutter">
                 
                  
                  <div class="col-md-12 bg-light">
                      <div class="login d-flex align-items-center py-5">
                         
                          <div class="container">
                              <div class="row align-items-center">
                                
                                <div class="col-lg-1">

                                </div>

                                <div class="col-lg-5">
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <form onSubmit={this.onSubmit}>
                                          <div class="form-group sm-3">
                                              <input id="inputEmail" type="email" placeholder="Email address"  required="" autofocus="" value={this.state.email} onChange={this.onChangeEmail} class="form-control rounded-pill border-0 shadow-sm px-4" />
                                          </div>
                                          <br/>
                                          <div class="form-group sm-3">
                                              <input id="inputPassword" type="password" placeholder="Password" required="" value={this.state.password} onChange={this.onChangePassword} class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                          </div>
                                          <div class="form-group sm-2">
                                            <br/>
                                            <label><b>User type: </b></label>
                                            <br/><br/>
                                            <select id="inputUserType" class="form-control rounded-pill border-0 shadow-sm px-4"   onChange={this.onChangeUserType} placeholder="user type">
                                                <option value="">Select</option>
                                                <option value="User" >User</option>
                                                <option value="Admin" >Admin</option>
                                                
                                            </select>
                                        </div>
                                          <br/>
                                          <br/>
                                          <div class="custom-control custom-checkbox mb-3">
                                              <input id="customCheck1" type="checkbox" class="custom-control-input"  style={myStyle.inputSection} />
                                              <label for="customCheck1" class="custom-control-label" style={myStyle.inputSection}>Remember password</label>
                                          </div>

                                          <a href="/forget_password"><h1 class="bg-light" style={{font:"5px"}}>&emsp;&emsp;<u>Forget Password?</u></h1></a>
                                          <br/>
                                          <br/><br/>
                                          <div className="form-group">
                                               &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                               <input type="submit" value="Log in" className="btn btn-primary" style={myStyle.buttonSection} />
                                          </div>
                                    
                                
                                   </form>
                                   {/* <button onClick={
                                    () => {
                                      window.location = '/forget_password';
                                    }
                                   }>Forget Password</button> */}
                                   
                                </div>
                                
                                <div class="col-lg-1">

                                </div>

                                <div class="col-lg-5">
                                      <h3 class="display-4">Welcome Back!</h3>
                                      <br/>
                                      <p class="text-muted mb-4">Log in to your Spacey account!</p>
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