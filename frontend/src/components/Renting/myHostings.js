import React from "react";
import NavbarHomepage from "../navbar_homepage";
import CurrentHosting from "./currentHostings.jpg";
import PastHosting from "./pastHostings.webp";
import Footer from '../Footer';

/*const styleForButtons = {
    //simple styled buttons
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
    height: "30%",
    borderBottom: "1px solid black",
    paddingBottom: "10px",
    marginBottom: "10px",
    marginTop: "10px",
    marginLeft: "10px",
    justifyContent: "center",
};*/

const myStyle= {
    buttonSection:{
     width:"200px",
     height:"40px",
     fontSize: "17px",
     borderRadius: "10px",
     backgroundColor: "#395cf9",
     color: "white",
    },
    openingPicSection:{
        width:"380px",
        height:"300px",
        
    },

  }

const MyHostings = () => {
    return (
        <div class="bg-light">
            <NavbarHomepage />

            <div class="row align-items-center">

            <div class="col-lg-1">
                                
        </div>
        <div class="col-lg-5">
            <br/><br/><br/>
        <div class="image">
                <img src={CurrentHosting} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
          </div> 
          <br/><br/>&emsp;&emsp;&emsp;&emsp;&emsp;
                <button className="btn btn-primary" style={myStyle.buttonSection} onClick={
                    () => {
                        window.location.href = "/current_hostings";
                    }
                }>Current Hostings</button>
            </div>

<div class="col-lg-1">

</div>
<div class="col-lg-5">

<br />
<br /><br/>
<div class="image">
    <img src={PastHosting} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
</div> 
<br/><br/>&emsp;&emsp;&emsp;&emsp;&emsp;
                <button className="btn btn-primary" style={myStyle.buttonSection} onClick={
                    () => {
                        window.location.href = "/past_hostings";
                    }
                }>Past Hostings</button>
            </div>

</div>
<br/><br/><br/>
<Footer/>  
</div>
        )
}

export default MyHostings;