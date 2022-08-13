import React from "react";
import NavbarHomepage from "../navbar_homepage";

const MyBookings = () => {
    const styleForButtons = {
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
        
        
    };
    return (
        <div>
            <NavbarHomepage />
            <button className="btn btn-primary" style={styleForButtons} onClick={
                () => {
                    window.location.href = "/current_bookings";
                }
            }>Current Bookings</button>
            <br />
            <br />
            <button className="btn btn-primary" style={styleForButtons} onClick={
                () => {
                    window.location.href = "/past_bookings";
                }
            }>Past Bookings</button>
        </div>
    );
}

export default MyBookings;