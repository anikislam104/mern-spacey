import React, { Component } from 'react';
// import axios from 'axios';
import NavbarHomepage from './navbar_homepage';





export default class Homepage extends Component {
    constructor(props) {
        super(props);
        // this.showImage = this.showImage.bind(this);
        this.state = {
            user_id: 0,
            image:'',
            path: '',
        }
        
    }

    componentDidMount() {
        fetch('http://localhost:5000/users/user_id')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    user_id: localStorage.getItem('user_id'),
                    image: json.user_image,
                    path: './Images/' + json.user_image,
                });
                console.log(this.state.user_id);
                console.log(this.state.image);
                
                
            })
    }

    
    render() {
        const myStyle = {
            logoSection: {
              width: "60px",
              height: "60px",
      
            },
            picSection: {
              backgroundColor: "#4E4C87",
            },
            textSection: {
              color: "#E1E3EE",
            },
            nameSection: {
              color: "#0E2A53",
            },
            buttonSection: {
              padding: "10px 40px",
              fontSize: "20px",
              borderRadius: "10px",
              backgroundColor: "#395cf9",
              color: "white",
            },
            openingPicSection: {
              width: "300px",
              height: "300px",
      
            },
          }
        
        return(
            
            <div className="maincontainer">
        <NavbarHomepage />
        <br />

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
                        <h3 class="display-6"><b>&emsp;Welcome to &nbsp;
                          
                          <font style={myStyle.nameSection}>&nbsp;Spacey</font></b>  </h3>
                      </div>


                    </div>

                    <div class="col-lg-3">

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