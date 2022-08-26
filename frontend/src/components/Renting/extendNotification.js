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

    //css styling for buttons small and beauitful
    const styleForButtons = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "10%",
        height: "30%",
        borderBottom: "1px solid black",
        paddingBottom: "10px",
        marginBottom: "10px",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",

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
            window.location.reload();
        })
        
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
            window.location.reload();
        })
        
    }

    return (
        <div class="bg-light">
        <NavbarHomepage />
        <br/>
        <h1 class="display-6" style={{textAlign:"center"}}><b>Extend Bookings Requests</b></h1>
        <br/>
                <div className="container">
                    <div className="extendRequest">
                        {extendRequest.map((extendRequest) => {
                            return (
                                <div style={style}>
                                    <h2><b>Property title: </b>{extendRequest[2]}</h2>
                                    <p><b>Host name: </b>{extendRequest[1]}</p>
                                    <p><b>Start date: </b>{extendRequest[3]}</p>
                                    <p><b>End date: </b>{extendRequest[4]}</p>
                                    <p><b>Requested end date: </b>{extendRequest[5]}</p>
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