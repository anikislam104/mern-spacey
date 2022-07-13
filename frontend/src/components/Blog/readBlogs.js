import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';

export default class ReadBlogs extends Component {
    myBlogs(){
        window.location.href = "/readBlogs/myBlogs";
    }
    allBlogs(){
        window.location.href = "/readBlogs/allBlogs";
    }
    render(){
        const myStyle= {
            buttonSection:{
             padding: "10px 40px",
             fontSize: "20px",
             borderRadius: "10px",
             backgroundColor: "#395cf9",
             color: "white",
            },
     
          }
        return(
            
            <div>
                <NavbarHomepage />
                <br/>
                <div class="container-fluid">
              <div class="row no-gutter">
                 
                  
                  <div class="col-md-12 bg-light">
                      <div class="login d-flex align-items-center py-5">
                         
                          <div class="container">
                              <div class="row align-items-center">
                                
                                <div class="col-lg-2">

                                </div>

                                <div class="col-lg-4">
                                  <div className="container">
                                    &nbsp; &nbsp; &nbsp;
                                      <button onClick={this.myBlogs} style={myStyle.buttonSection}> My Blogs</button>
                                      <br/>
                                      <br/>
                                      &nbsp; &nbsp; &nbsp;
                                      <button onClick={this.allBlogs} style={myStyle.buttonSection}> All Blogs</button>
                                      </div>
                                </div>
                                

                                <div class="col-lg-6">
                                    <br/><br/><br/>
                                      <h3 class="display-4">Welcome to <p> Spacey blog!</p></h3>
                                      <br/>
                                      <p class="text-muted mb-4">Share & Explore Experiences!</p>
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