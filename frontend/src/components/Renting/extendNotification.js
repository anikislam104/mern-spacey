import React, { useEffect } from "react";
import axios from "axios";
import NavbarHomepage from "../navbar_homepage";

const ExtendNotification = () => {
    const [extendRequest, setExtendRequest] = React.useState([]);

    useEffect(() => {
        const id=localStorage.getItem("user_id");
        const user={
            user_id:id
        }
        // console.log(localStorage.getItem('user_id'));
        // console.log(id);
        axios.post("http://localhost:5000/renting/get_extend_booking_requests",user)
            .then(res => {
                console.log(res.data);
                setExtendRequest(res.data);
            });
    }, []);

    //css styling for request info
    const style = {
        margin: "10px",
        padding: "10px",
        border: "1px solid black",
        borderRadius: "4px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        backgroundColor: "#f5f5f5",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    };

    const styleForHeader = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
        borderBottom: "1px solid black",
        paddingBottom: "10px"
    };
    
    //css styling for buttons small and beauitful
    const styleForButtons = {
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
        marginRight: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        border: "1px solid #ddd",
        borderRadius: "4px",
        justifyContent: "center"
    };

    //handle accept button
    const handleAccept = (rid) => {
        console.log(rid);
        const id={
            request_id:rid
        }
        axios.post("http://localhost:5000/renting/accept_extend_booking_request",id)
        .then(res => {
            console.log(res.data);
        })
        window.location="/current_bookings";
    }

    //handle decline button
    const handleDecline = (rid) => {
        console.log(rid);
        const id={
            request_id:rid
        }
        axios.post("http://localhost:5000/renting/decline_extend_booking_request",id)
        .then(res => {
            console.log(res.data);
        })
        window.location="/current_bookings";
    }

    return (
              <div>
                <NavbarHomepage />
                <div style={styleForHeader}>
                    <h1>Extend Booking Requests</h1>
                </div>
                <div className="container">
                    <div className="extendRequest">
                        {extendRequest.map((extendRequest) => {
                            return (
                                <div style={style}>
                                    <h2>Property title: {extendRequest[2]}</h2>
                                    <p>Host name: {extendRequest[1]}</p>
                                    <p>Start date: {extendRequest[3]}</p>
                                    <p>End date: {extendRequest[4]}</p>
                                    <p>Requested end date: {extendRequest[5]}</p>
                                    <br />
                                    <button className="btn btn-primary" style={styleForButtons} onClick={
                                        () => {
                                            handleAccept(extendRequest[0]);
                                        }
                                    }>Accept</button>
                                    <br />
                                    <button className="btn btn-primary" style={styleForButtons} onClick={
                                        () => {
                                            handleDecline(extendRequest[0]);
                                        }
                                    }>Decline</button>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>

              </div>    
    )
    
}

export default ExtendNotification;