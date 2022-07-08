import React, { Component } from 'react';
import confirm from "./confirm.svg";

export default class SignUpConfirmation extends Component {

    onSubmit(e) {
        e.preventDefault();
        window.location = '/login';
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
          }

        return(
            <div className="maincontainer">
            <div class="container-fluid">
                <div class="row no-gutter">
                     
                    <div class="col-md-12 bg-light">
                        <div class="login d-flex align-items-center py-5">
                        
                            <div class="container">
                            <div class="row align-items-center"> 
                                <div class="col-lg-2">

                                </div>
                                <div class="col-lg-5">
                                <div>
                                     <img src={confirm} class="img-responsive" alt="" />
                                </div>
                                <br/><br/>
                                <label>Your account has been created. Press “Finish” <br/> to continue!</label>   
                                   <form onSubmit={this.onSubmit}>
                                   <br/><br/>
                                   <div className="form-group">
                                        <input type="submit" value="Finish" className="btn btn-primary" style={myStyle.buttonSection} />
                                   </div>

                                   </form>       

                                </div>

                                <div class="col-lg-5">
                                <br/><br/><br/>
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