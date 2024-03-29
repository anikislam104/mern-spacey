import React, { Component } from 'react';
import NavbarHomepage from '../navbar_homepage';
import BlogHome1 from "./blog_home_1.svg";
import BlogHome2 from "./blog_home_2.svg";
import Footer from '../Footer';


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
                        <h3 class="display-6"><b>&emsp;Welcome to 
                          
                          <font style={myStyle.nameSection}>&nbsp;Spacey blog!</font></b>
                          
                          </h3>
                          <br/>
                          <h5 class="card-subtitle text-muted">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                          <b>Share & Explore Experiences!</b></h5>
                                            
                          
                      </div>


                    </div>

                    <div class="col-lg-3">

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
              
    <div class="row no-gutter bg-light">
        <div class="col-lg-1">
                                
        </div>
        <div class="col-lg-5">
          <div class="image">
                <img src={BlogHome1} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
          </div> 
          <h5><b>Share your hosting experience</b></h5>
          <br/>
          <div className="container">
                
                &emsp;&emsp;
                <button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off"  onClick={this.writeBlog} style={myStyle.buttonSection}> Write Blog</button>
          </div>
        </div>

        <div class="col-lg-1">
                                
        </div>
        <div class="col-lg-5">
              <div class="image">
                  <img src={BlogHome2} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
              </div> 
              <label><h5>&emsp;<b>Explore your & others blogs </b></h5></label><br/>
              <div className="container">
                <br/>
                &emsp;&emsp;
                <button className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off"  onClick={this.readBlogs} style={myStyle.buttonSection}> Read Blogs</button>

             </div> 
        </div>             
    </div>
<br/><br/>
<br/>
          </div>
          <br/><br/><br/>
<Footer/>  
            </div>
            
        )
    }
}