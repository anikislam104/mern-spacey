import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
import Footer from '../Footer';
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
            
            <div class="bg-light">
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

                    <div class="col-lg-6">
                      <div class="card-body">
                        <h3 class="display-6"><b>Experience hosting resources!</b>
                          
                          </h3>
                          <br/>
                          <h5 class="card-subtitle text-muted">&emsp;&emsp;&emsp;&emsp;&emsp;
                          <b>Find answers & get inspired along your hosting journey</b></h5>
                                            
                          
                      </div>


                    </div>

                    <div class="col-lg-3">

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
          <label><h5>&emsp;<b>See your previous posts</b> </h5></label><br/>
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
              <label><h5><b>Explore what others are sharing </b></h5></label><br/>
              <div className="container">
                <br/>
                &emsp;&emsp;&emsp;
                <button onClick={this.allBlogs} style={myStyle.buttonSection}> All Blogs</button>

             </div> 
        </div>             
    </div>

          </div>
          <br/>
          <br/><br/><br/>
<Footer/> 
            </div>
        )
    }
}