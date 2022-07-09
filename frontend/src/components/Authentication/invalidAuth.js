import React,{ Component } from "react";
import unconfirm from "./unconfirm.svg";



export default class InvalidAuth extends Component {
    onSubmit = (e) => {
        e.preventDefault();
        window.location = "/";
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
                                    <br/><br/><br/>
                                <div>
                                     <img src={unconfirm} class="img-responsive" alt="" />
                                </div>
                                <br/><br/>
                                <label>Incorrect credentials provided. Please “Go back” <br/> to continue!</label>
                                  
                                   <form onSubmit={this.onSubmit}>
                                   <br/><br/>
                                   <div className="form-group">
                                        <input type="submit" value="Go back" className="btn btn-primary" style={myStyle.buttonSection} />
                                   </div>

                                   </form>       

                                </div>

                                <div class="col-lg-5">
                                
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