import React from "react";

const MyBookings = () => {
    return (
        <div>
            <button className="btn btn-primary" onClick={
                () => {
                    window.location.href = "/current_bookings";
                }
            }>Current Bookings</button>
            <br />
            <br />
            <button className="btn btn-primary" onClick={
                () => {
                    window.location.href = "/past_bookings";
                }
            }>Past Bookings</button>
        </div>
    );
}

export default MyBookings;