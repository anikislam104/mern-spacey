import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
import MyBlog from "./my_blog.svg";
import OtherBlog from "./other_blog.svg";

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
            openingPicSection:{
                width:"300px",
                height:"300px",
                
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
                                
                                <div class="col-lg-3">

                                </div>

                                <div class="col-lg-8">
                                      
                                      <div class="card-body">
                                           <h1 class="card-title">Experience hosting resources!</h1>
                                           <br/>
                                           <h5 class="card-subtitle text-muted">&emsp;Find answers & get inspired along your hosting journey</h5>
                                      </div>
                                    
                                </div>     

                                <div class="col-lg-1">
                                
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
                <img src={MyBlog} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
          </div> 
          <label><h5>&emsp;See your prevoius posts </h5></label><br/>
          <div className="container">
                <br/>
                &emsp;&emsp;
                <button onClick={this.myBlogs} style={myStyle.buttonSection}> My Blogs</button>
          </div>
        </div>

        <div class="col-lg-1">
                                
        </div>
        <div class="col-lg-5">
              <div class="image">
                  <img src={OtherBlog} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
              </div> 
              <label><h5>Explore what others are sharing </h5></label><br/>
              <div className="container">
                <br/>
                &emsp;&emsp;&emsp;
                <button onClick={this.allBlogs} style={myStyle.buttonSection}> All Blogs</button>

             </div> 
        </div>             
    </div>

          </div>
            </div>
        )
    }
}