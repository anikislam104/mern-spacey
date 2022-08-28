import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import spacey from "../../src/components/Authentication/spacey.svg";
import "./Footer.css";

export default class Footer extends Component {

  render() {
    const myStyle= {
      navSection:{
       backgroundColor: "#C2C6CC",
       color: "white",
       width:"1285px",
       height:"90px",
      },
      
      optionSection:{
        color: "#0E2A53",
        fontSize:"30px",
       },

       textSection:{
        backgroundColor:"#484848",
        color:"white",
        width:"150px",
        height:"40px",
        textAlign:"center",
       },

    }

    return (
      
        <footer class="footer-distributed">
        <div class="footer-left">

        
        &nbsp;&nbsp;<img src={spacey} class="img-responsive" alt=" " />
            
            <Link to={"/homepage"} className="navbar-brand"  ><font style={myStyle.optionSection}><b>Spacey &nbsp;</b></font></Link> 

<h5 class="card-subtitle text-muted">
                          <b>New place, new space!</b></h5>
            <p class="footer-company-name">Spacey © 2022</p>
            
        </div>

        <div class="footer-center">

            <div>
                <i class="fa fa-map-marker"></i>
                <p><span>444 Gulshan</span> Dhaka, Bangladesh</p>
            </div>

            <div>
                <i class="fa fa-phone"></i>
                <p>+8801012345679</p>
            </div>

            <div>
                <i class="fa fa-envelope"></i>
                <p><a href="mailto:spacey@gmail.com">spacey@gmail.com</a></p>
            </div>

        </div>

        <div class="footer-right">

            <p class="footer-company-about">
                <span>About <i>Spacey</i></span>
                We always give priority to the <br/> security & comfort of our clients. <br/> And we are successfully achieving
                <br/> our goals for the last few years.
            </p>

        </div>

    </footer>
    )

  }
}
