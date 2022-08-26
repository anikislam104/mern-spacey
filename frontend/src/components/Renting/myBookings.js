import React from "react";
import NavbarHomepage from "../navbar_homepage";
import CurrentBooking from "./currentBooking.jpg";
import PastBooking from "./pastBooking.jpg";

const MyBookings = () => {
    /*const styleForButtons = {
        //large sized card style for buttons
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
            width:"350px",
            height:"300px",
            
        },
 
      }
    return (
        <div class="bg-light">
            <NavbarHomepage />

            <div class="row align-items-center">

            <div class="col-lg-1">
                                
        </div>
        <div class="col-lg-5">
            <br/><br/><br/>
        <div class="image">
                <img src={CurrentBooking} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
          </div> 
          <br/><br/>&emsp;&emsp;&emsp;&emsp;
            <button className="btn btn-primary" style={myStyle.buttonSection} onClick={
                () => {
                    window.location.href = "/current_bookings";
                }
            }>Current Bookings</button>

            </div>

            <div class="col-lg-1">
            
            </div>
            <div class="col-lg-5">

            <br />
            <br /><br/>
            <div class="image">
                <img src={PastBooking} class="img-responsive" alt=" "  style={myStyle.openingPicSection}/>
          </div> 
          <br/><br/>&emsp;&emsp;&emsp;&emsp;
            <button className="btn btn-primary" style={myStyle.buttonSection} onClick={
                () => {
                    window.location.href = "/past_bookings";
                }
            }>Past Bookings</button>
            </div>

            </div>

        </div>
    );
}

export default MyBookings;