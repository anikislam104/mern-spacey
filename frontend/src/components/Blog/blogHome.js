import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
import BlogHome1 from "./blog_home_1.svg";
import BlogHome2 from "./blog_home_2.svg";
import { Box } from "@chakra-ui/layout";


export default class BlogHome extends Component {
    constructor(props) {
        super(props);

        this.writeBlog=this.writeBlog.bind(this);
        this.readBlogs=this.readBlogs.bind(this);
        
    }


    writeBlog() {
        window.location.href = "/writeBlog";
    }

    readBlogs() {
        window.location.href = "/readBlogs";
    }
    
    render() {
        const myStyle= {
            buttonSection:{
             padding: "10px 40px",
             fontSize: "20px",
             borderRadius: "10px",
             backgroundColor: "#395cf9",
             color: "white",
            },
            openingPicSection:{
                width:"300px",
                height:"300px",
                
            },
     
          }
        return(
            <Box>
            <div>
                <NavbarHomepage />
                <br/>
            <div class="container-fluid">
              <div class="row no-gutter">
                 
                  
                  <div class="col-md-12 bg-light">
                      <div class="login d-flex align-items-center py-5">
                         
                          <div class="container">
                              <div class="row align-items-center">
                                
                                <div class="col-lg-3">

                                </div>

                                <div class="col-lg-5">
                                      
                                      <div class="card-body">
                                           <h1 class="card-title">Welcome to Spacey blog!</h1>
                                           <br/>
                                           <h5 class="card-subtitle text-muted">&emsp;&emsp;&emsp;&emsp;Share & Explore Experiences!</h5>
                                      </div>
                                    
                                </div>     

                                <div class="col-lg-4">
                                
                                  </div>

                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              
    <div class="row no-gutter">
        <div class="col-lg-1">
                                
        </div>
        <div class="col-lg-5">
          <div class="image">
                <img src={BlogHome1} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
          </div> 
          <label><h5>Share your hosting experience</h5></label><br/>
          <div className="container">
                <br/>
                &emsp;&emsp;
                <button onClick={this.writeBlog} style={myStyle.buttonSection}> Write Blog</button>
          </div>
        </div>

        <div class="col-lg-1">
                                
        </div>
        <div class="col-lg-5">
              <div class="image">
                  <img src={BlogHome2} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
              </div> 
              <label><h5>&emsp;Explore your & others blogs </h5></label><br/>
              <div className="container">
                <br/>
                &emsp;&emsp;
                <button onClick={this.readBlogs} style={myStyle.buttonSection}> Read Blogs</button>

             </div> 
        </div>             
    </div>

          </div>
            </div>
            </Box>
        )
    }
}